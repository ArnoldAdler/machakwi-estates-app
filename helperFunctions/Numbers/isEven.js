export const isEven = (number) => {
  if (!number) throw new Error("No number passed in 'isEven' Function");

  if (number % 2 == 0) {
    return true;
  } else {
    return false;
  }
};
