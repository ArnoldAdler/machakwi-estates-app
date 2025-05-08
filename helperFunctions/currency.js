var currencyObj = {
  sign: "$",
  name: "Unknown Currency",
};

class Currency {
  init(v) {
    currencyObj = v;
  }

  getSign() {
    return currencyObj.sign || "$?";
  }
}

export const currency = new Currency();
