/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import media from "../lib/media";

export default function Loading() {
  return (
    <section css={wrapper}>
      <div className="category">
        <ul>
          <li>전체</li>
          <li>콜드브루</li>
          <li>블렌디드</li>
        </ul>
      </div>
      <ul>
        <li>
          <div></div>
          <span></span>
        </li>
        <li>
          <div></div>
          <span></span>
        </li>
        <li>
          <div></div>
          <span></span>
        </li>
        <li>
          <div></div>
          <span></span>
        </li>
        <li>
          <div></div>
          <span></span>
        </li>
        <li>
          <div></div>
          <span></span>
        </li>
      </ul>
    </section>
  );
}

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
    li {
      float: left;
      width: calc(50% - 0.75em);
      margin: 0.5em 0.5em;
      &:nth-of-type(even) {
        margin-left: 0;
      }
      div {
        padding-top: 100%;
        -webkit-animation: skeleton-gradient 1.8s infinite ease-in-out;
        animation: skeleton-gradient 1.8s infinite ease-in-out;
        background-color: rgba(165, 165, 165, 0.1);
      }
      span {
        display: inline-block;
        width: 100%;
        padding-top: 15%;
        margin-top: 1em;
        -webkit-animation: skeleton-gradient 1.8s infinite ease-in-out;
        animation: skeleton-gradient 1.8s infinite ease-in-out;
        background-color: rgba(165, 165, 165, 0.1);
      }
    }
  }
  @-webkit-keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
`;
