import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Customers from "./pages/Customers";

import Orders from "./pages/orders/Orders";

import AddProduct from "./pages/products/AddProduct";
import ManageStocks from "./pages/products/ManageStocks";
import UpdateProduct from "./pages/products/UpdateProduct";

import AddCoupon from "./pages/coupons/AddCoupon";
import ManageCoupons from "./pages/coupons/ManageCoupons";
import UpdateCoupon from "./pages/coupons/UpdateCoupon";

import CategoryToAdd from "./pages/categories/CategoryToAdd";
import AddBrand from "./pages/categories/AddBrand";
import BrandsList from "./pages/categories/BrandsList";
import UpdateBrand from "./pages/categories/UpdateBrand";
import AddColor from "./pages/categories/AddColor";
import ColorsList from "./pages/categories/ColorsList";
import UpdateColor from "./pages/categories/UpdateColor";
import AddCategory from "./pages/categories/AddCategory";
import CategoriesList from "./pages/categories/CategoriesList";
import UpdateCategory from "./pages/categories/UpdateCategory";

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
          <Route path="/edit-product/:id" element={<UpdateProduct />} />

          {/* Coupons */}
          <Route path="/add-coupon" element={<AddCoupon />} />
          <Route path="/manage-coupons" element={<ManageCoupons />} />
          <Route path="/edit-coupon/:id" element={<UpdateCoupon />} />

          {/* Categories */}
          <Route path="/category-to-add" element={<CategoryToAdd />} />

          {/* Brand */}
          <Route path="/add-brand" element={<AddBrand />} />
          <Route path="/brands-list" element={<BrandsList />} />
          <Route path="/edit-brand/:id" element={<UpdateBrand />} />

          {/* Color */}
          <Route path="/add-color" element={<AddColor />} />
          <Route path="/colors-list" element={<ColorsList />} />
          <Route path="/edit-color/:id" element={<UpdateColor />} />

          {/* Category */}
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/categories-list" element={<CategoriesList />} />
          <Route path="/edit-category/:id" element={<UpdateCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
