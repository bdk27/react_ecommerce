import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home.jsx";
import NotFound from "@/pages/NotFound.jsx";

import Tops from "@/pages/Tops/Tops.jsx";
import TShirts from "@/pages/Tops/TShirts.jsx";
import Hoodies from "@/pages/Tops/Hoodies.jsx";
import Polos from "@/pages/Tops/Polos.jsx";
import Jackets from "@/pages/Tops/Jackets.jsx";
import Knitwear from "@/pages/Tops/Knitwear.jsx";
import Shirts from "@/pages/Tops/Shirts.jsx";

import Bottoms from "@/pages/Bottoms/Bottoms.jsx";
import Shorts from "@/pages/Bottoms/Shorts.jsx";
import Jeans from "@/pages/Bottoms/Jeans.jsx";
import Suits from "@/pages/Bottoms/Suits.jsx";
import Casual from "@/pages/Bottoms/Casual.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 主頁 */}
        <Route path="/" element={<Home />} />
        {/* 上衣類 */}
        <Route path="/tops" element={<Tops />} />
        <Route path="/tops/t-shirts" element={<TShirts />} />
        <Route path="/tops/hoodies" element={<Hoodies />} />
        <Route path="/tops/polos" element={<Polos />} />
        <Route path="/jackets" element={<Jackets />} />
        <Route path="/knitwear" element={<Knitwear />} />
        <Route path="/shirts" element={<Shirts />} />
        {/* 下身類 */}
        <Route path="/bottoms" element={<Bottoms />} />
        <Route path="/bottoms/shorts" element={<Shorts />} />
        <Route path="/bottoms/jeans" element={<Jeans />} />
        <Route path="/bottoms/suits" element={<Suits />} />
        <Route path="/bottoms/casual" element={<Casual />} />
        {/* 404 頁面 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
