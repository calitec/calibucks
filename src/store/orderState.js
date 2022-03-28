import { atom, selector } from "recoil";

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }
  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const orderState = atom({
  key: "orderState",
  default: [],
  effects: [localStorageEffect("coffee")],
});

export const getFullPriceSelector = selector({
  key: "getFullPriceSelector",
  get: ({ get }) => {
    let orders = get(orderState);
    if (orders) {
      const result = orders
        .map((item) => {
          const { price, quantity } = item;
          return +price * +quantity;
        })
        .reduce((prev, current, _) => prev + current);
      return result;
    }
  },
});
