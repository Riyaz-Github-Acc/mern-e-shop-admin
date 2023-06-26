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
import CategoryToAdd from "./pages/categories/CategoryToAdd";
import AddBrand from "./pages/categories/AddBrand";
import AddColor from "./pages/categories/AddColor";

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
          <Route path="/login" element={<Login />} />

          {/* Orders */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />

          {/* Products */}
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-stocks" element={<ManageStocks />} />

          {/* Coupons */}
          <Route path="/add-coupon" element={<AddCoupon />} />
          <Route path="/manage-coupons" element={<ManageCoupons />} />

          {/* Categories */}
          <Route path="/category-to-add" element={<CategoryToAdd />} />
          <Route path="/add-brand" element={<AddBrand />} />
          <Route path="/add-color" element={<AddColor />} />
          <Route path="/add-category" element={<AddCategory />} />

          <Route path="/colors-list" element={<ColorsList />} />
          <Route path="/brands-list" element={<BrandsList />} />
          <Route path="/categories-list" element={<CategoriesList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
