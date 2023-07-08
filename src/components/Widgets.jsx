/* eslint-disable react/prop-types */
import {
  CreditCard,
  Inventory,
  ShoppingBasket,
  CurrencyRupee,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchOrdersAction,
  salesStatsAction,
} from "../redux/slices/orderSlices";
import { fetchProductsAction } from "../redux/slices/productSlices";
import baseURL from "../utils/baseURL";

const Widget = ({ type }) => {
  let data;
  const dispatch = useDispatch();

  // Get Sales From Store
  useEffect(() => {
    dispatch(salesStatsAction());
  }, [dispatch]);

  const { stats } = useSelector((state) => state?.orders);

  // Get Products From Store
  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);

  const {
    orders: { orders },
  } = useSelector((state) => state?.orders);

  // Get Products From Store
  let productUrl = `${baseURL}/products`;

  useEffect(() => {
    dispatch(
      fetchProductsAction({
        url: productUrl,
      })
    );
  }, [productUrl, dispatch]);

  const {
    products: { products },
  } = useSelector((state) => state?.products);

  if (type === "todaysSales") {
    data = {
      title: "Today's Sales",
      isMoney: true,
      number: 0,
      bgRadius: "rgba(239, 88, 28, 0.5)",
      icon: (
        <CreditCard
          sx={{ fontSize: 40 }}
          style={{
            backgroundColor: "rgba(239, 88, 28, 1)",
            borderRadius: "100%",
            padding: "8px",
          }}
        />
      ),
    };
  } else if (type === "totalOrders") {
    data = {
      title: "Total Orders",
      isMoney: false,
      number: orders?.length,
      bgRadius: "rgba(0, 133, 64, 0.5)",
      icon: (
        <Inventory
          sx={{ fontSize: 40 }}
          style={{
            backgroundColor: "rgba(0, 133, 64, 1)",
            borderRadius: "100%",
            padding: "8px",
          }}
        />
      ),
    };
  } else if (type === "totalProducts") {
    data = {
      title: "Total Products",
      isMoney: false,
      number: products?.length,
      bgRadius: "rgba(0, 119, 182, 0.5)",
      icon: (
        <ShoppingBasket
          sx={{ fontSize: 40 }}
          style={{
            backgroundColor: "rgba(0, 119, 182, 1)",
            borderRadius: "100%",
            padding: "8px",
          }}
        />
      ),
    };
  } else if (type === "totalSales") {
    data = {
      title: "Total Sales",
      isMoney: true,
      number: stats?.sales?.map((sale) => sale.totalSales.toFixed(0)),
      bgRadius: "rgba(209, 43, 62, 0.5)",
      icon: (
        <CurrencyRupee
          sx={{ fontSize: 40 }}
          style={{
            backgroundColor: "rgba(209, 43, 62, 1)",
            borderRadius: "100%",
            padding: "8px",
          }}
        />
      ),
    };
  } else {
    return;
  }

  return (
    <div className="flex-1 flex flex-row items-center gap-5 w-[100%] bg-light-blue py-5 px-10 mx-auto rounded-lg">
      <div
        className={`flex items-center justify-center p-[6px] rounded-full`}
        style={{ backgroundColor: data.bgRadius }}
      >
        {data.icon}
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-md text-light-gray whitespace-nowrap">
          {data.title}
        </div>
        <div className="text-lg">
          {data.isMoney && "₹"} {data.number}
        </div>
      </div>
    </div>
  );
};

export default Widget;
