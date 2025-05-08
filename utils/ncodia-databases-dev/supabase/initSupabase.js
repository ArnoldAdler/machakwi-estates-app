import { createClient } from "@supabase/supabase-js";

////
export var supabaseDatabase;
export var reactQueryInstance;
export var dbOptions = {};
export var useDevDatabase = false;
export var dbUser = {
  id: "",
  name: "Developer",
};
///
export const initSupabase = (config, reactQueryInstance_, options) => {
  if (!config || !reactQueryInstance_) {
    alert("Missing Params 6366");
    return;
  }
  try {
    useDevDatabase =
      options?.mode == "demo" || options?.mode == "development" ? true : false;
    ///
    var connectionOptions = useDevDatabase ? { db: { schema: "dev" } } : {};
    supabaseDatabase = createClient(
      config.supabaseUrl,
      config.supabaseAnonKey,
      connectionOptions
    );
    //////////
    reactQueryInstance = reactQueryInstance_;
    dbOptions = options || {};
    console.log(
      `%c*********** SUPABASE ${
        useDevDatabase ? "LOCAL" : "PRODUCTION"
      } DATABASE ***********`,
      `background: #222; color:${useDevDatabase ? "#bada55" : "#0085D0"}`
    );
    //////
  } catch (error) {
    alert("App could not connect to supabase database. 822");
    console.log(
      "%c***********Supabase Initialisation Failed***********",
      "background: #222; color: #FF0000",
      error
    );
  }
};
