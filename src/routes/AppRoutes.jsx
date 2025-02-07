import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout.jsx";
import Cart from "@/pages/Cart.jsx";

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
      <Routes>
        {/* 父路由：MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* 子路由：對應 / */}
          <Route index element={<Navigate to="/t-shirts" replace />} />

          {/* 子路由：對應 /t-shirts 等 */}
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
          {/* 新增結帳頁面的路由 */}
          <Route path="cart" element={<Cart />} />
          {/* 錯誤路由：重新導向回 / */}
          <Route path="*" element={<Navigate to="/t-shirts" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
