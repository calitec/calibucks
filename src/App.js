import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Detail from "./pages/Detail";
import useCacheImage from "./hooks/useCacheImage";
import Complete from "./pages/Complete";

export default function App() {
  useCacheImage();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
