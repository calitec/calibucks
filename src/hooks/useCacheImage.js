import { useLayoutEffect } from "react";

export default function useCacheImage() {
  useLayoutEffect(() => {
    [
      "/images/01.jpg",
      "/images/02.jpg",
      "/images/03.jpg",
      "/images/04.jpg",
      "/images/05.jpg",
      "/images/06.jpg",
      "/images/07.jpg",
      "/images/08.jpg",
    ].forEach((picture) => {
      new Image().src = picture;
    });
  }, []);
}
