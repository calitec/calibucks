/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Complete() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/", { replace: true });
  };
  return (
    <section css={wrapper}>
      <p>봐주셔서 감사합니다^^</p>
      <Button onClick={goHome}>홈으로 돌아가기</Button>
    </section>
  );
}

const wrapper = css`
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
  }
`;
