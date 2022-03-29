import { atom, selector } from "recoil";
import data from "../data.json";

const datas = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject(new Error());
      resolve(data);
    }, 500);
  });
};

export const homeState = atom({
  key: "homeState",
  default: datas(),
});

export const filterState = atom({
  key: "filterState",
  default: "",
});

export const searchState = atom({
  key: "searchState",
  default: {
    keyword: "",
    toggle: false,
  },
});

export const splittedDataSelector = selector({
  key: "splittedDataSelector",
  get: ({ get }) => {
    let home = get(homeState);
    let filter = get(filterState);
    let search = get(searchState);

    if (filter) {
      return home.filter((item) => {
        return item.category == filter;
      });
    } else if (search) {
      return home.filter((item) => {
        return (
          item.name
            .split(" ")
            .join("")
            .indexOf(search.keyword.split(" ").join("")) !== -1
        );
      });
    } else {
      return home;
    }
  },
});

// export const filterSelector = selector({
//   key: "filterSelector",
//   get: ({ get }) => {
//     let filter = get(filterState);
//     let home = get(homeState);
//     return home.filter((item) => {
//       return item.category == filter;
//     });
//   },
// });

// export const searchSelector = selector({
//   key: "searchSelector",
//   get: ({ get }) => {
//     let home = get(homeState);
//     let search = get(searchState);
//     if (search) {
//       return home.filter((item) => {
//         return (
//           item.name
//             .split(" ")
//             .join("")
//             .indexOf(search.keyword.split(" ").join("")) !== -1
//         );
//       });
//     }
//   },
// });
