import { supabaseDatabase } from "./initSupabase";

export const deleteSupabaseData = async (path, onSuccess, onError, options) => {
  var [tableName, dataId] = path.split(".");
  /////////
  const { data, error } = await supabaseDatabase
    .from(tableName)
    .delete()
    .eq("id", dataId);
  /////////////
  if (error) {
    var { code, details, hint, message } = error;
    console.log("Supabase Delete Data Error:", error);
    if (onError) onError(`${code}, ${message}`);
  } else {
    console.log("Document deleting:", data);
    if (onSuccess) onSuccess(data);
  }
  //
};
