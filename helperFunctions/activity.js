//V-1

import { db } from "HelperFunctions/firebase";

var user_ = { firstName: "Arnold", lastName: "Adler", id: "cdsvsdvsdv " };
var recentActivites_ = [];
/////////
const getUser = () => {
  return user_;
};
const getRecentActivites = () => {
  return recentActivites_;
};
//////////
class Activity {
  constructor() {}
  init = (data) => {
    try {
      user_ = data;
      console.log(
        "%c**ACTIVITY DATA Initialised**",
        "background: #222; color: #bada55"
      );
    } catch (error) {
      alert("App could not connect to stocks Data");
      console.log(
        "%c***********ACTIVITY DATA Initialisation Failed***********",
        "background: #222; color: #FF0000"
      );
    }
  };
  /////////////////
  add = async (activity) => {
    const d = new Date();
    let month = d.getMonth().toString().padStart(2, "0");
    let year = d.getFullYear();
    //
    var data = getRecentActivites().find((item, i) => {
      return item.id == `${year}${month}`;
    });
    //
    if (!data) {
      db.add(
        `recentActivites.${`${year}${month}`}`,
        {
          activites: db.arrayUnion({
            // userName: `${getUser().firstName} ${getUser().lastName}`,
            userId: getUser().id,
            createdAt: new Date(),
            ...activity,
          }),
        },
        () => {
          console.log(`${activity.name} Added Successfully`);
        },
        (e) => {
          console.log(e);
        }
      );
    } else {
      db.update(
        `recentActivites.${`${year}${month}`}`,
        {
          activites: db.arrayUnion({
            // userName: `${getUser().firstName} ${getUser().lastName}`,
            userId: getUser().id,
            createdAt: new Date(),
            ...activity,
          }),
        },
        () => {
          console.log(`${activity.name} Added Successfully`);
        },
        (e) => {
          console.log(e);
        }
      );
    }
  };
  register = this.add;
}

export const activity = new Activity();
