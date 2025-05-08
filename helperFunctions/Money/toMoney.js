export const toMoney = (amount) => {
  var amt = Number(amount);
  return amt.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
};
