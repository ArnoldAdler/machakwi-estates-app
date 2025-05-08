// import SvgBasic from "Assets/icons/Basic";
// import SvgPremium from "Assets/icons/Premium";
// import SvgStandard from "Assets/icons/Standard";
import { Text } from "react-native";

var SvgBasic = <Text>SvgBasic</Text>;
var SvgPremium = <Text>SvgPremium</Text>;
var SvgStandard = <Text>SvgStandard</Text>;
var accountsData = [];
var accountObj = {};
////
var isAccountsInitialized = false;
var isAccountInitialized = false;
///////////////

//////////////
const isAccountsReady = () => {
  return isAccountsInitialized;
};
const isAccountReady = () => {
  return isAccountInitialized;
};

///////////////////////////
class Accounts {
  init(data) {
    accountsData = data;
    isAccountsInitialized = true;
  }
  getAllAccounts(includeInactiveAccounts) {
    if (!isAccountsReady()) {
      console.log(
        `Cant getAllAccounts() because accounts class has not being initialised`
      );
    }
    if (includeInactiveAccounts) {
      return accountsData;
    } else {
      var accountsLocal = accountsData.filter((account) => {
        return account.statusId !== "inactive";
      });
      return accountsLocal;
    }
  }
  getAccountName(accountId) {
    var account = accountsData.find((item) => {
      return item.id == accountId;
    });
    if (account) {
      return account.name;
    } else return "";
  }
  //
  getAccountType(accountId) {
    var account = accountsData.find((item) => {
      return item.id == accountId;
    });
    if (account && account.type) {
      return account.type;
    } else return "";
  }
  //
  getAccount(accountId) {
    var account = accountsData.find((item) => {
      return item.id == accountId;
    });
    if (account) {
      return account;
    } else return null;
  }
  //
  getAccountEmail(accountId) {
    var account = accountsData.find((item) => {
      return item.id == accountId;
    });
    if (account && account.contact && account.contact.email) {
      return account.contact.email;
    } else return null;
  }
  //
  getAccountPriorityIcon = (accountId, styles) => {
    if (!isAccountsReady()) {
      console.log(
        `Cant get priority icon for ${accountId} because accounts class has not being initialised`
      );
    }
    var data = accountsData.find((item, i) => {
      return item.id == accountId;
    });
    if (data) {
      var priority = data.priority;
      if (!priority || priority == "basic")
        return (
          <SvgBasic
            style={{
              color: "#4ba2ff",
              fontSize: 15,
              marginBottom: 2,

              ...styles,
            }}
          />
        );

      if (priority == "standard")
        return (
          <SvgStandard
            style={{
              color: "#26a543",
              fontSize: 15,
              marginBottom: 2,
              ...styles,
            }}
          />
        );
      if (priority == "premium")
        return (
          <SvgPremium
            style={{
              color: "#959494",
              fontSize: 15,
              marginBottom: 2,
              ...styles,
            }}
          />
        );
      if (priority == "premium_plus")
        return (
          <SvgPremium
            style={{
              color: "#E8BE2C",
              fontSize: 15,
              marginBottom: 2,
              ...styles,
            }}
          />
        );
    } else {
      return <></>;
    }
    return <></>;
  };
}
class Account {
  init(data) {
    accountObj = data;
    isAccountInitialized = true;
  }
  //
  getAccount() {
    if (accountObj) {
      return accountObj;
    } else return {};
  }
  //
  getAccountPriorityIcon = (accountId, styles) => {
    if (!isAccountsReady()) {
      console.log(
        `Cant get priority icon for ${accountId} because accounts class has not being initialised`
      );
    }
    var data = accountsData.find((item, i) => {
      return item.id == accountId;
    });
    if (data) {
      var priority = data.priority;
      if (!priority || priority == "basic")
        return (
          <SvgBasic
            style={{
              color: "#4ba2ff",
              fontSize: 30,
              marginBottom: 2,
              ...styles,
            }}
          />
        );

      if (priority == "standard")
        return (
          <SvgStandard
            style={{
              color: "#26a543",
              fontSize: 30,
              marginBottom: 2,
              ...styles,
            }}
          />
        );
      if (priority == "premium")
        return (
          <SvgPremium
            style={{
              color: "#959494",
              fontSize: 30,
              marginBottom: 2,
              ...styles,
            }}
          />
        );
      if (priority == "premium_plus")
        return (
          <SvgPremium
            style={{
              color: "#E8BE2C",
              fontSize: 30,
              marginBottom: 2,
              ...styles,
            }}
          />
        );
    } else {
      return undefined;
    }
    return;
  };
  getPriorityIcon = (priorityId, styles) => {
    if (!priorityId || priorityId == "basic")
      return (
        <SvgBasic
          style={{
            color: "#4ba2ff",
            fontSize: 30,
            marginBottom: 2,
            ...styles,
          }}
        />
      );

    if (priorityId == "standard")
      return (
        <SvgStandard
          style={{
            color: "#26a543",
            fontSize: 30,
            marginBottom: 2,
            ...styles,
          }}
        />
      );
    if (priorityId == "premium")
      return (
        <SvgPremium
          style={{
            color: "#959494",
            fontSize: 30,
            marginBottom: 2,
            ...styles,
          }}
        />
      );
    if (priorityId == "premium_plus")
      return (
        <Premium
          style={{
            color: "#E8BE2C",
            fontSize: 30,
            marginBottom: 2,
            ...styles,
          }}
        />
      );

    return;
  };
}

export const accounts = new Accounts();
export const account = new Account();
