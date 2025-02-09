import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout.jsx";
import Cart from "@/pages/Cart.jsx";
import Login from "@/pages/Login.jsx";
import SignUp from "@/pages/SignUp.jsx";

import TShirts from "@/pages/Tops/TShirts.jsx";
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
          <Route index element={<Navigate to="/products/t-shirts" replace />} />

          {/* 子路由：對應 /t-shirts 等 */}
          <Route path="products/t-shirts" element={<TShirts />} />
          <Route path="products/polos" element={<Polos />} />
          <Route path="products/jackets" element={<Jackets />} />
          <Route path="products/knitwear" element={<Knitwear />} />
          <Route path="products/shorts" element={<Shorts />} />
          <Route path="products/jeans" element={<Jeans />} />
          <Route path="products/suits" element={<Suits />} />
          <Route path="products/casual" element={<Casual />} />
          <Route path="products/shirts" element={<Shirts />} />
          {/* 新增結帳頁面的路由 */}
          <Route path="cart" element={<Cart />} />
          {/* 新增登入頁面的路由 */}
          <Route path="login" element={<Login />} />
          {/* 新增註冊頁面的路由 */}
          <Route path="signup" element={<SignUp />} />
        </Route>
        {/* 錯誤路由：重新導向回 / */}
        <Route
          path="*"
          element={<Navigate to="/products/t-shirts" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
