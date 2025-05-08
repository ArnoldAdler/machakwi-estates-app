import { dbUser, supabaseDatabase } from "./initSupabase";

export const updateSupabaseData = async (
  path,
  data,
  onSuccess,
  onError,
  options
) => {
  //REMOVE JOINS
  Object.keys(data).map((key) => {
    if (key.includes("_id")) {
      var joinToRemove = key.replace("_id", "");
      delete data[joinToRemove];
    }
  });

  var [tableName, dataId] = path.split(".");
  console.log("DATA TABLE NAME:", tableName);
  console.log("DATA TO BE UPDATED:", data);
  /////////
  const { data_, error } = await supabaseDatabase
    .from(tableName)
    .update({ ...data })
    .eq("id", dataId);
  /////////////
  if (error) {
    var { code, details, hint, message } = error;
    console.log("Supabase Update Data Error:", error);
    if (onError) onError(`${code}, ${message}`);
  } else {
    console.log("Document updated:", data);
    if (onSuccess) onSuccess(data);
  }
};
