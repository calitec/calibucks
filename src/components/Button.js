/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Button({ children, type, activate = true, ...rest }) {
  return (
    <button type={type || "button"} css={wrapper(activate)} {...rest}>
      {children}
    </button>
  );
}

const wrapper = (activate) => css`
  display: block;
  text-align: center;
  background-color: ${activate ? "#363636" : "#999999"};
  width: 95%;
  margin: 0 auto;
  color: #ffffff;
  font-weight: 500;
  line-height: 35px;
  border-radius: 3px;
`;
