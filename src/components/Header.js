/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { filterState, searchState } from "../store/commonState";
import media from "../lib/media";

export default function Header() {
  const [search, setSearch] = useRecoilState(searchState);
  const [_, setFilter] = useRecoilState(filterState);

  const onSearch = () => {
    setSearch((prev) => ({
      ...prev,
      toggle: true,
    }));
  };

  const onChange = (e) => {
    setFilter("");
    setSearch((prev) => ({
      ...prev,
      keyword: e.target.value,
    }));
  };

  const onClose = () => {
    setSearch((prev) => ({
      ...prev,
      keyword: "",
      toggle: false,
    }));
  };

  return (
    <header css={wrapper}>
      <nav>
        <div>
          <Link to="/">
            <h1>Cafe</h1>
          </Link>
        </div>
        <div className="header-cart">
          <Link to="/order">
            <img src="/images/cart.png" alt="" />
          </Link>
        </div>
        <div className="header-search-icon" onClick={onSearch}>
          <img src="/images/search.png" alt="" />
        </div>
      </nav>
      {search.toggle && (
        <div className="header-search">
          <input
            type="text"
            autoFocus
            value={search.keyword}
            onChange={onChange}
          />
          <span onClick={onClose}>&times;</span>
        </div>
      )}
    </header>
  );
}

const wrapper = css`
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    padding: 10px 0;
    background-color: #ffffff;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    ${media.desktop} {
      width: 40%;
      left: 50%;
      transform: translateX(-50%);
      margin: 0 auto;
    }
    div {
      display: inline-block;
      position: relative;
      top: 2px;
      vertical-align: middle;
      h1 {
        display: inline-block;
        font-weight: 700;
        font-family: "Noto Sans";
        cursor: pointer;
      }
      &:first-of-type {
        position: relative;
        left: 2em;
      }
      &:not(:first-of-type) {
        margin: 0 0.5em;
        width: calc(20% / 2 - 1em);
        text-align: center;
        float: right;
        cursor: pointer;
      }
      &.header-cart {
        position: relative;
        top: -1px;
      }
    }
  }
  .header-search {
    position: fixed;
    top: 48px;
    width: 100%;
    z-index: 2;
    ${media.desktop} {
      width: 40%;
      left: 50%;
      transform: translateX(-50%);
    }
    input {
      padding-left: 1em;
      width: 100%;
      height: 5vh;
      border: 1px solid #363636;
    }
    span {
      display: inline-block;
      position: absolute;
      top: 8px;
      right: 5px;
    }
  }
`;
