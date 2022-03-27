import { atom, selector, selectorFamily } from "recoil";

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

export const getFullPriceSelector = selectorFamily({
  key: "getFullPriceSelector",
  get: (checks) => ({ get }) => {
    let orders = get(orderState);
    if (orders && checks) {
      return (
        checks.length &&
        checks
          .map((item) => {
            const { price, quantity } = item;
            return +price * +quantity;
          })
          .reduce((prev, current, _) => prev + current)
      );
    }
  },
});
