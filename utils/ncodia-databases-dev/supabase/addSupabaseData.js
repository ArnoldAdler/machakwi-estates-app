import { dbUser, supabaseDatabase, useDevDatabase } from "./initSupabase";

export const addSupabaseData = async (
  path,
  data,
  onSuccess,
  onError,
  options
) => {
  /////////

  /////////////
  var [tableName, dataId] = path.split(".");
  ////
  console.log("DATA TABLE NAME:", tableName);
  console.log("DATA TO BE SAVED:", data);
  /////////
  const { error } = await supabaseDatabase.from(tableName).insert({ ...data });
  // , created_by: dbUser, updated_by: dbUser
  if (error) {
    var { code, details, hint, message } = error;
    console.log("Supabase Data Add Error:", error);
    if (onError) onError(`${code}, ${message}`);
  } else {
    console.log("Document added:", data);
    if (onSuccess) onSuccess(data);
  }
  ///
};
