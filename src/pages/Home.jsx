/* eslint-disable no-unused-vars */
import { useEffect } from "react";

import Orders from "./orders/Orders";
import Widget from "../components/Widgets";

const Home = () => {
  return (
    <>
      <section className="w-[100%] flex flex-wrap items-center justify-between gap-3">
        <Widget type="todaysSales" />
        <Widget type="totalOrders" />
        <Widget type="totalProducts" />
        <Widget type="totalSales" />
      </section>

      <section className="mt-10">
        <Orders />
      </section>
    </>
  );
};

export default Home;
