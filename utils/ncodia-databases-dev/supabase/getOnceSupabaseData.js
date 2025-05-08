import { supabaseDatabase } from "./initSupabase";

export const getOnceSupabaseData = async (
  path,
  onSuccess,
  onError,
  options
) => {
  /////////
  ////
  var [tableName, dataId] = path.split(".");
  ////
  let { data, error } = await supabaseDatabase
    .from(tableName)
    .select("*")
    .eq("id", dataId);

  if (error) {
    var { code, details, hint, message } = error;
    console.log("Supabase Get Data Error:", error);
    if (onError) onError(`${code}, ${message}`);
    // reject(error);
  } else {
    var item = data[0] || {};
    if (item.date) item.date = new Date(item.date);
    if (item.created_at) item.created_at = new Date(item.created_at);
    if (item.updated_at) item.updated_at = new Date(item.updated_at);
    onSuccess(item);
    // resolve(item);
  }
};
