import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/data/productSlice";

import AppRoutes from "@/routes/AppRoutes";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ThemeProvider } from "@/context/ThemeContext.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AZvlYK9nEhOiDPdxdXhGc_5FoGZf4oLkqfEFQ1c81rR-MaFkMxBhBGl7mDGiP4ZZuCbEWx7FvhaJSWF-",
        currency: "TWD",
      }}
    >
      <ThemeProvider>
        <AppRoutes></AppRoutes>
      </ThemeProvider>
    </PayPalScriptProvider>
  );
}

export default App;
