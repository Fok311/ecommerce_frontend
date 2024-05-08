import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

import Products from "./pages/products";
import ProductsAddNew from "./pages/ProductsAddNew";
import ProductsEdit from "./pages/ProductsEdit";
import Carts from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import Order from "./pages/order";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <SnackbarProvider
          maxSnack={3}
          autoHideDuration={1500}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/add" element={<ProductsAddNew />} />
              <Route path="/products/:id" element={<ProductsEdit />} />
              <Route path="/cart" element={<Carts />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<Order />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;