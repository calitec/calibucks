/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function NotFound() {
  return (
    <section css={wrapper}>
      <h3>404 Not Found</h3>
      <p>페이지를 찾을 수 없습니다.</p>
    </section>
  );
}

const wrapper = css`
  padding-top: 50%;
  h3,
  p {
    text-align: center;
    font-family: "Noto Sans";
  }
  h3 {
    font-weight: 700;
  }
  p {
    font-weight: 400;
  }
`;
