/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Orders from "./orders/Orders";
import Widget from "../components/Widgets";
import SpinLoading from "../components/loaders/SpinLoading";
import NoDataFound from "../components/messages/NoDataFound";
import { fetchOrdersAction } from "../redux/slices/orderSlices";

const Home = () => {
  // Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);
  // Get Data from Store
  const {
    error,
    loading,
    orders: { orders },
  } = useSelector((state) => state?.orders);

  return (
    <>
      <section className="w-[100%] flex flex-wrap items-center justify-between gap-3">
        <Widget type="todaysSales" />
        <Widget type="totalOrders" />
        <Widget type="totalProducts" />
        <Widget type="totalSales" />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white capitalize">
          Recent Orders
        </h2>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mt-4">
          {loading ? (
            <SpinLoading />
          ) : orders?.length <= 0 ? (
            <NoDataFound />
          ) : (
            <Orders orders={orders} />
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
