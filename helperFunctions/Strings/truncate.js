export const truncate = (str, charNum) => {
  if (!str) return;
  return str.length >= charNum
    ? str.substring(0, charNum ? charNum : 7) + "..."
    : str;
};
