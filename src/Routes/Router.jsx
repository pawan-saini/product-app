import { Routes, Route } from "react-router-dom";
// * Routes
import * as URL from "./Routes";

// * Global Layout
import Layout from "../components/Layout/Layout";
// * Pages
import NotFound from "../pages/NotFound/NotFound";
import HomePage from "../pages/HomePage/HomePage";
import ProductView from "../pages/ProductView/ProductView";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import ThankYouPage from "../pages/ThankYou/ThankYou";

export default function Router() {
  return (
    <Routes>
      <Route
        path={URL.Home}
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />

      <Route
        path={URL.ProductView}
        element={
          <Layout>
            <ProductView />
          </Layout>
        }
      />

      <Route
        path={URL.AddToCart}
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />

      <Route
        path={URL.Checkout}
        element={
          <Layout>
            <Checkout />
          </Layout>
        }
      />
      <Route
        path={URL.ThankYou}
        element={
          <Layout>
            <ThankYouPage />
          </Layout>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
