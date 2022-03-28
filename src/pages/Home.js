/** @jsxImportSource @emotion/react */
import { memo } from "react";
import { css } from "@emotion/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  detailState,
  filterSelector,
  filterState,
  homeState,
  searchSelector,
  searchState,
} from "../store/homeState";
import { NavLink } from "react-router-dom";
import media from "../lib/media";

export default function Home() {
  const data = useRecoilValue(homeState);
  const { keyword } = useRecoilValue(searchState);
  const searchedData = useRecoilValue(searchSelector);
  const filteredData = useRecoilValue(filterSelector);
  const [_, setDetail] = useRecoilState(detailState);
  const [__, setFilter] = useRecoilState(filterState);

  return (
    <section css={wrapper}>
      <div className="category">
        <ul>
          <li onClick={() => setFilter("")}>전체</li>
          <li onClick={() => setFilter("coldbrew")}>콜드브루</li>
          <li onClick={() => setFilter("blended")}>블렌디드</li>
        </ul>
      </div>
      <ul>
        {filteredData.length
          ? filteredData.map((item, index) => {
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
          : keyword.length > 1
          ? searchedData.map((item, index) => {
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

const Item = memo(({ id, image, name, price, onSelectItem }) => {
  return (
    <NavLink to={`/detail/${id}`}>
      <li onClick={onSelectItem}>
        <img src={`/images/${image}`} alt={image} />
        <div>
          <h3>{name}</h3>
          <div>{Number(price).toLocaleString()} 원</div>
        </div>
      </li>
    </NavLink>
  );
});

const wrapper = css`
  .category {
    position: fixed;
    top: 48px;
    width: 100%;
    background-color: #ffffff;
    ${media.desktop} {
      width: 40%;
      margin: 0 auto;
    }
    ul {
      display: flex;
      justify-content: space-between;
      padding: 1em 0;
      li {
        flex: 1;
        text-align: center;
      }
    }
  }
  > ul {
    width: 100%;
    a {
      float: left;
      width: calc(50% - 0.75em);
      margin: 0 auto;
      margin: 0 0.5em;
      &:nth-of-type(even) {
        margin-left: 0;
      }
      li {
        font-size: 0.8em;
        img {
          display: block;
          width: 100%;
        }
        > div {
          padding: 0.5em;
        }
      }
    }
    &::after {
      display: block;
      content: "";
      clear: both;
    }
  }
`;
