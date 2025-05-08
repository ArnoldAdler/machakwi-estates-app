// import { accounts } from "./accounts";

var usersArray = [];

class Users {
  init(data) {
    usersArray = data;
  }
  getUser(userId) {
    var user = usersArray.find((item) => {
      return item.id == userId;
    });
    if (user) {
      return user;
    } else return null;
  }
  getUserProfilePhoto(userId) {
    var user = usersArray.find((item) => {
      return item.id == userId;
    });
    if (user?.profilePhoto) {
      return user.profilePhoto;
    } else return null;
  }
  getUserName(userId, userObj) {
    if (userId == "guest") return "Guest User";

    if (userObj) {
      if (userObj.firstName && userObj.lastName)
        return `${userObj.firstName} ${userObj.lastName}`;
      else {
        return userObj.userName || userObj.name;
      }
    }

    var user = usersArray.find((item) => {
      return item.id == userId;
    });

    if (user) {
      if (user.firstName !== undefined && user.lastName !== undefined)
        return `${user.firstName} ${user.lastName}`;
      else {
        return user.userName || user.name;
      }
    } else return "";
  }
  getUserEmail(userId, userObj) {
    if (userObj) {
      if (userObj.contact && userObj.contact.email)
        return userObj.contact.email;
      if (userObj.email) return userObj.email;
    }

    var user = usersArray.find((item) => {
      return item.id == userId;
    });
    if (user) {
      if (user.contact && user.contact.email) return user.contact.email;
      if (user.email) return user.email;
    }
    return "";
  }
  getUserPhone(userId, userObj) {
    if (userObj) {
      if (userObj.contact && userObj.contact.phone)
        return userObj.contact.phone;
      if (userObj.phone) return userObj.phone;
      if (userObj.phoneNumber) return userObj.phoneNumber;
    }

    var user = usersArray.find((item) => {
      return item.id == userId;
    });
    if (user) {
      if (user.contact && user.contact.phone) return user.contact.phone;
      if (user.phone) return user.phone;
      if (user.phoneNumber) return user.phoneNumber;
    }
    return "";
  }
  // getAccounts(userId) {
  //   var user = this.getUser(userId);
  //   if (user) {
  //     var accountRoles = user.accountsRoles.map((item) => {
  //       var account = accounts.getAccount(item.accountNumber);
  //       return { ...item, ...account };
  //     });
  //     return accountRoles;
  //   }
  //   return null;
  // }
  getEmployees() {
    var employees = usersArray.filter((user) => {
      return user.isEmployee;
    });
    return employees;
  }
}

export const users = new Users();
