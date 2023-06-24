import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Customers from "./pages/Customers";

import Orders from "./pages/orders/Orders";

import AddProduct from "./pages/products/AddProduct";
import ManageStocks from "./pages/products/ManageStocks";

import ColorsList from "./pages/categories/ColorsList";
import BrandsList from "./pages/categories/BrandsList";
import AddCategory from "./pages/categories/AddCategory";
import CategoriesList from "./pages/categories/CategoriesList";

import AddCoupon from "./pages/coupons/AddCoupon";
import ManageCoupons from "./pages/coupons/ManageCoupons";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AdminRoute>
              <Layout />
            </AdminRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-stocks" element={<ManageStocks />} />
          <Route path="/add-coupon" element={<AddCoupon />} />
          <Route path="/manage-coupons" element={<ManageCoupons />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/categories-list" element={<CategoriesList />} />
          <Route path="/colors-list" element={<ColorsList />} />
          <Route path="/brands-list" element={<BrandsList />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
