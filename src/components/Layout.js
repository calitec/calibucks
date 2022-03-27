/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import media from "../lib/media";
import Header from "./Header";
import Loading from "./Loading";

export default function Layout() {
  return (
    <section css={wrapper}>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </section>
  );
}

const wrapper = css`
  main {
    position: relative;
    top: 48px;
    ${media.desktop} {
      width: 40%;
      margin: 0 auto;
    }
  }
`;
