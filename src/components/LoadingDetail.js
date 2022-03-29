/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function LoadingDetail() {
  return (
    <section css={wrapper}>
      <div className="img" />
      <div className="name"></div>
      <div className="count"></div>
      <button>장바구니</button>
      <div className="price"></div>
      <div className="nutrition"></div>
      <div className="description"></div>
      <div className="description"></div>
      <div className="description"></div>
    </section>
  );
}

const wrapper = css`
  width: 100%;
  font-size: 0.8em;
  h3,
  > div {
    line-height: 18px;
  }
  > div {
    -webkit-animation: skeleton-gradient 1.8s infinite ease-in-out;
    animation: skeleton-gradient 1.8s infinite ease-in-out;
    background-color: rgba(165, 165, 165, 0.1);
    margin: 1em auto 1em 1em;
    &.img {
      width: 95%;
      height: 390px;
      padding: 0.5em 1em;
      margin: 1em auto 0;
    }
    &.name {
      width: 45vw;
      height: 2vh;
    }
    &.count {
      width: 30vw;
      height: 5vh;
    }
    &.price {
      width: 25vw;
      height: 2vh;
    }
    &.nutrition {
      width: 35vw;
      height: 2vh;
    }
    &.description {
      height: 2vh;
      &:nth-of-type(5) {
        width: 80vw;
      }
      &:nth-of-type(6) {
        width: 70vw;
      }
      &:last-of-type {
        width: 60vw;
      }
    }
  }
  h3 {
    font-weight: 700;
    padding: 1em;
  }
  button {
    display: block;
    text-align: center;
    background-color: #363636;
    width: 95%;
    margin: 0 auto;
    color: #ffffff;
    font-weight: 500;
    line-height: 35px;
    border-radius: 3px;
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
