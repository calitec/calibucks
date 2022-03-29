/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import media from "../lib/media";
import Header from "./Header";
import Loading from "./Loading";
import LoadingDetail from "./LoadingDetail";
import ErrorBoundary from "./ErrorBoundary";

export default function Layout() {
  const location = useLocation();
  let loader;
  const rootPath = "/";
  const isRootPath = location.pathname == rootPath;

  if (isRootPath) {
    loader = <Loading />;
  } else {
    loader = <LoadingDetail />;
  }

  return (
    <section css={wrapper(location.pathname)}>
      <Header />
      <main>
        <ErrorBoundary>
          <Suspense fallback={loader}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
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
