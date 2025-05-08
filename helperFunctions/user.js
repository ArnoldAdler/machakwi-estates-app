// import { mode } from "../Config";

var userObj = {};

class User {
  init(data) {
    userObj = data;
  }
  getId = () => {
    return userObj.id;
  };
  getUser = () => {
    return userObj;
  };
  getName = () => {
    if (userObj.firstName || userObj.lastName)
      return `${userObj.firstName} ${userObj.lastName}`;
    else {
      return userObj.userName || userObj.name;
    }
  };
  getAllUserPermissions = () => {
    if (userObj && userObj.permissions) return userObj.permissions;
    else [];
  };

  // getPermission = (permissionId, user) => {
  //   if (!user?.id && userObj.id) user = userObj;
  //   if (!user?.id) return true;
  //   if (user.isOwner) return true;

  //   // console.log("fffffffffff", permissionId, user);
  //   if (permissionId == "open") return true;
  //   if (permissionId == "password") return true;
  //   if (mode == "production_fix" || mode == "development") return true;
  //   // if (isDev) return true;
  //   ///Quick Fetch
  //   if (user) {
  //     var data = user?.permissions?.find((permission, i) => {
  //       return permission == permissionId;
  //     });
  //     if (data) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   //////////
  //   if (!userObj.id) return true;
  //   if (userObj.permissions) {
  //     var data = userObj.permissions.find((permission, i) => {
  //       return permission == permissionId;
  //     });
  //     if (data) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   return false;
  // };
}

export const user = new User();
