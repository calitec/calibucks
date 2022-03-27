import { atom, selector } from "recoil";
import data from "../data.json";

export const homeState = atom({
  key: "homeState",
  default: data,
});

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const detailState = atom({
  key: "detailState",
  default: null,
});

export const filterState = atom({
  key: "filterState",
  default: "",
});

export const searchSelector = selector({
  key: "searchSelector",
  get: ({ get }) => {
    let home = get(homeState);
    let search = get(searchState);
    if (search) {
      return home.filter((item) => {
        return (
          item.name.split(" ").join("").indexOf(search.split(" ").join("")) !==
          -1
        );
      });
    }
  },
});

export const filterSelector = selector({
  key: "filterSelector",
  get: ({ get }) => {
    let filter = get(filterState);
    let home = get(homeState);
    return home.filter((item) => {
      return item.category == filter;
    });
  },
});
