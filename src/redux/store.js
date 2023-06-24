import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlices";
import brandReducer from "./slices/brandSlices";
import colorReducer from "./slices/colorSlices";
import productReducer from "./slices/productSlices";
import categoryReducer from "./slices/categorySlices";

// Create Store
const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
  },
});

export default store;
