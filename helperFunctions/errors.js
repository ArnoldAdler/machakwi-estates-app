import { db } from "./firebase";

class Errors {
  addError(e, options) {
    var { code } = options || {};

    db.add(
      `errors`,
      {
        code: e.code,
        name: e.name,
        stack: e.stack,
        message: e.message,
        date: new Date(),
        ...options,
      },
      () => {
        console.log(`New error added to database. ${e.name}`);
      }
    );
    if (code == "db/collection/not-found") {
    }
  }
}

export const errors = new Errors();
