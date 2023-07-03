import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlices";
import orderReducer from "./slices/orderSlices";
import brandReducer from "./slices/brandSlices";
import colorReducer from "./slices/colorSlices";
import couponReducer from "./slices/couponSlices";
import reviewsReducer from "./slices/reviewSlices";
import productReducer from "./slices/productSlices";
import categoryReducer from "./slices/categorySlices";

// Create Store
const store = configureStore({
  reducer: {
    users: userReducer,
    orders: orderReducer,
    brands: brandReducer,
    colors: colorReducer,
    coupons: couponReducer,
    reviews: reviewsReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});

export default store;
