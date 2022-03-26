/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  detailState,
  homeState,
  searchSelector,
  searchState,
} from "../store/homeState";
import Item from "../components/Item";

export default function Home() {
  const data = useRecoilValue(homeState);
  const [_, setDetail] = useRecoilState(detailState);
  const [keyword, setKeyword] = useRecoilState(searchState);
  const filterdData = useRecoilValue(searchSelector);

  return (
    <section css={wrapper}>
      <ul>
        {keyword.length > 1
          ? filterdData.map((item, index) => {
              const { id, image, name, price } = item;
              const props = {
                index,
                id,
                image,
                name,
                price,
                onSelectItem: () => setDetail(item),
              };
              return <Item key={id} {...props} />;
            })
          : data.map((item, index) => {
              const { id, image, name, price } = item;
              const props = {
                index,
                id,
                image,
                name,
                price,
                onSelectItem: () => setDetail(item),
              };
              return <Item key={id} {...props} />;
            })}
      </ul>
    </section>
  );
}

const wrapper = css`
  ul {
    width: 100%;
    li {
      float: left;
      width: 50%;
      font-size: 0.8em;
      img {
        width: 100%;
      }
      > div {
        padding: 0.5em;
      }
    }
  }
`;
