import { atom, selector } from "recoil";

export const orderState = atom({
  key: "orderState",
  default: JSON.parse(localStorage.getItem("coffee")) || [],
});

export const orderSelector = selector({
  key: "orderSelector",
  get: ({ get }) => {
    let orders = get(orderState);
    if (orders) {
      return localStorage.setItem("coffee", JSON.stringify(orders));
    }
  },
});
