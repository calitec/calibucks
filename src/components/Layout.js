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
    ${media.desktop} {
      width: 50%;
      margin: 0 auto;
    }
  }
`;
