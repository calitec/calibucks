import { atom, selector } from "recoil";
import data from "../data.json";

const datas = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};

export const homeState = atom({
  key: "homeState",
  default: datas(),
});

export const searchState = atom({
  key: "searchState",
  default: {
    keyword: "",
    toggle: false,
  },
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
          item.name
            .split(" ")
            .join("")
            .indexOf(search.keyword.split(" ").join("")) !== -1
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
