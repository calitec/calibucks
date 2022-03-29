/** @jsxImportSource @emotion/react */
import { memo } from "react";
import { css } from "@emotion/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filterState, splittedDataSelector } from "../store/commonState";
import { NavLink } from "react-router-dom";
import media from "../lib/media";

export default function Home() {
  const [__, setFilter] = useRecoilState(filterState);
  const splittedDatas = useRecoilValue(splittedDataSelector);

  return (
    <section css={wrapper}>
      <div className="category">
        <ul>
          <li onClick={() => setFilter("")}>전체</li>
          <li onClick={() => setFilter("coldbrew")}>콜드브루</li>
          <li onClick={() => setFilter("blended")}>블렌디드</li>
        </ul>
      </div>
      <ul css={wrapper}>
        {splittedDatas.length
          ? splittedDatas.map((item, index) => {
              const { id, image, name, price } = item;
              const props = {
                id,
                image,
                name,
                price,
              };
              return <List key={id} {...props} />;
            })
          : ""}
      </ul>
    </section>
  );
}

const List = memo(({ id, image, name, price }) => {
  return (
    <NavLink to={`/detail/${id}`}>
      <li>
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
    &::after {
      display: block;
      content: "";
      clear: both;
    }
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
  }
`;
