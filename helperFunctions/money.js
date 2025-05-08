import { currency } from "./currency";

export const toMoney = (amount, moneySign) => {
  var isNegatieValue = false;
  var amt = Number(amount);
  if (amt < 0) {
    amt = amt * -1;
    isNegatieValue = true;
  }
  if (moneySign == undefined) {
    moneySign = `${currency.getSign()} `;
    return `${isNegatieValue ? "- " : ""}${moneySign}${amt.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
      }
    )}`;
  }
  return `${isNegatieValue ? "- " : ""}${amt.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;
};
