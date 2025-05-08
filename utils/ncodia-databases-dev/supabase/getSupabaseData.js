import { supabaseDatabase, useDevDatabase } from "./initSupabase";

export const getSupabaseData = async (path, onSuccess, onError, options) => {
  //////////////////

  return new Promise(async (resolve, reject) => {
    ////
    var [tableName] = path.split(".");

    var joins = options?.joins;
    var orderBy = options?.orderBy || "id";
    var isAscending = false;
    if (options?.orderDirection == "ascending") isAscending = true;
    ////
    let { data, error } = await supabaseDatabase
      .from(tableName)
      .select(`*${joins ? `,${joins}` : ""}`)
      .order(orderBy, { ascending: isAscending });
    if (error) {
      var { code, details, hint, message } = error;
      console.log("Supabase Get Data Error:", error);
      if (onError) onError(`${code}, ${message}`);
      reject(error);
    } else {
      data.forEach((item) => {
        if (item.date) item.date = new Date(item.date);
        if (item.created_at) item.created_at = new Date(item.created_at);
        if (item.updated_at) item.updated_at = new Date(item.updated_at);
      });
      onSuccess(data);
      resolve(data);
    }
    var schema = useDevDatabase ? "dev" : "public";
    supabaseDatabase
      .channel(`${schema}:${tableName}`) // Use the correct channel syntax
      .on(
        "postgres_changes",
        { event: "*", schema: schema, table: tableName },
        async (payload) => {
          // var data = payload.new;
          let { data, error } = await supabaseDatabase
            .from(tableName)
            .select(`*${joins ? `,${joins}` : ""}`)
            .order(orderBy, { ascending: isAscending });
          data.forEach((item) => {
            if (item.date) item.date = new Date(item.date);
            if (item.created_at) item.created_at = new Date(item.created_at);
            if (item.updated_at) item.updated_at = new Date(item.updated_at);
          });
          onSuccess(data);
        }
      )
      .subscribe();
  });
};
