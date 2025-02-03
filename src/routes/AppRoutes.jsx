import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout.jsx";

import Home from "@/pages/Home.jsx";
import Category from "@/pages/Category.jsx";

import TShirts from "@/pages/Tops/TShirts.jsx";
import Hoodies from "@/pages/Tops/Hoodies.jsx";
import Polos from "@/pages/Tops/Polos.jsx";
import Jackets from "@/pages/Tops/Jackets.jsx";
import Knitwear from "@/pages/Tops/Knitwear.jsx";
import Shirts from "@/pages/Tops/Shirts.jsx";

import Shorts from "@/pages/Bottoms/Shorts.jsx";
import Jeans from "@/pages/Bottoms/Jeans.jsx";
import Suits from "@/pages/Bottoms/Suits.jsx";
import Casual from "@/pages/Bottoms/Casual.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout />

      <Routes>
        {/* 主頁 */}
        <Route path="/" element={<Home />} />

        <Route path="/category" element={<Category />}>
          <Route index element={<Navigate to="/" replace />} />
          <Route path="t-shirts" element={<TShirts />} />
          <Route path="hoodies" element={<Hoodies />} />
          <Route path="polos" element={<Polos />} />
          <Route path="jackets" element={<Jackets />} />
          <Route path="knitwear" element={<Knitwear />} />
          <Route path="shorts" element={<Shorts />} />
          <Route path="jeans" element={<Jeans />} />
          <Route path="suits" element={<Suits />} />
          <Route path="casual" element={<Casual />} />
          <Route path="shirts" element={<Shirts />} />
        </Route>

        {/* 錯誤路由重新導向Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
