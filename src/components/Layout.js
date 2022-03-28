/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import media from "../lib/media";
import Header from "./Header";
import Loading from "./Loading";

export default function Layout() {
  const location = useLocation();

  return (
    <section css={wrapper(location.pathname)}>
      <Header />
      <main>
        {location.pathname == "/" ? (
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        ) : (
          <Outlet />
        )}
      </main>
    </section>
  );
}

const wrapper = (pathname) => css`
  main {
    position: relative;
    top: ${pathname == "/" ? "calc(48px * 2)" : "48px"};
    ${media.desktop} {
      width: 40%;
      margin: 0 auto;
    }
  }
`;
