import AppRoutes from "@/routes/AppRoutes";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AZvlYK9nEhOiDPdxdXhGc_5FoGZf4oLkqfEFQ1c81rR-MaFkMxBhBGl7mDGiP4ZZuCbEWx7FvhaJSWF-",
        currency: "TWD",
      }}
    >
      <AppRoutes></AppRoutes>
    </PayPalScriptProvider>
  );
}

export default App;
