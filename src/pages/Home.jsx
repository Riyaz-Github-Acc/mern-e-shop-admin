/* eslint-disable no-unused-vars */
import { fetchOrdersAction } from "../redux/slices/orderSlices";

import Widget from "../components/Widgets";
import { Link } from "react-router-dom";
import SpinLoading from "../components/loaders/SpinLoading";
import NoDataFound from "../components/messages/NoDataFound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);
  //get data from store
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
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-[#0f0f25]">
                <tr className="text-light-gray">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
                  >
                    Payment Status
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold sm:table-cell"
                  >
                    Order Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold"
                  >
                    Delivery Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold"
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-light-blue">
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-6">
                      {order.orderNumber}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-light-gray lg:table-cell">
                      {order.paymentStatus === "Not paid" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-600 text-zinc-200">
                          {order.paymentStatus}
                        </span>
                      ) : (
                        order.paymentStatus
                      )}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-light-gray lg:table-cell">
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-light-gray lg:table-cell">
                      Unknown
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-light-gray sm:table-cell">
                      {order?.status}
                    </td>
                    <td className="px-3 py-4 text-sm text-light-gray">
                      {order?.totalPrice}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-sm font-semibold sm:pr-6">
                      {order?.paymentStatus === "Not paid" ? (
                        <Link
                          style={{ cursor: "not-allowed" }}
                          className="text-gray-500"
                        >
                          Edit
                        </Link>
                      ) : (
                        <Link
                          to={`/admin/orders/${order?._id}`}
                          className="text-cyan-500 hover:text-cyan-600 hover:underline"
                        >
                          Edit
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
