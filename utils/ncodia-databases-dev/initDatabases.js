import { initFirebase } from "./firebase/initFirebase";
import { initSupabase } from "./supabase/initSupabase";
////
export const initDatabases = (databases) => {
  if (!databases) {
    alert("Missing Database Config 6366");
    return;
  }
  ///
  ///
  databases.map((db) => {
    var id = db.id;
    var name = db.name;
    ///
    var config = db.config;
    //
    if (id == "firebase") {
      initFirebase(config, name, db);
      return;
    }
    if (id == "supabase") {
      initSupabase(config, name, db);
      return;
    }
    alert(`Database ${name} is not supported by the utils/ncodia-databases-dev library!`);
  });
};
