import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ErrorMsg from "../../components/messages/ErrorMsg";
import SpinLoading from "../../components/loaders/SpinLoading";
import NoDataFound from "../../components/messages/NoDataFound";
import { fetchOrdersAction } from "../../redux/slices/orderSlices";

export default function ManageStocks() {
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
      <div className="px-4 sm:px-6 lg:px-8 whitespace-nowrap">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold text-white capitalize">
              Recent Orders
            </h2>
          </div>
        </div>

        {loading ? (
          <SpinLoading />
        ) : error ? (
          <ErrorMsg message={error?.message} />
        ) : orders?.length <= 0 ? (
          <NoDataFound />
        ) : (
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
                          className="px-3 py-3.5 text-left text-sm font-semibold"
                        >
                          User Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold"
                        >
                          Payment Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold"
                        >
                          Order Date
                        </th>
                        {/* <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold"
                        >
                          Delivery Date
                        </th> */}
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold"
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          className="pr-8 py-3.5 text-left text-sm font-semibold"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-5 text-left text-sm font-semibold"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-light-blue">
                      {/* loop here */}
                      {orders?.map((order) => (
                        <tr key={order?._id}>
                          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="text-white">
                              {order.orderNumber}
                            </div>
                          </td>

                          <td className="px-3 py-4 text-sm text-light-gray">
                            <div className="text-white">
                              {order?.user?.userName}
                            </div>
                          </td>

                          <td className="px-3 py-4 text-sm text-light-gray capitalize">
                            {order.paymentStatus === "Not paid" && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-zinc-200">
                                {order.paymentStatus}
                              </span>
                            )}

                            {order.paymentStatus === "paid" && (
                              <span className="px-4 items-center justify-center inline-flex text-xs leading-5 font-semibold rounded-full bg-green-600 text-zinc-200">
                                {order.paymentStatus}
                              </span>
                            )}
                          </td>

                          <td className="px-3 py-4 text-sm text-light-gray">
                            {new Date(order?.createdAt).toLocaleDateString()}
                          </td>

                          {/* <td className="hidden px-4 py-4 text-sm text-light-gray lg:table-cell">
                            Unknown
                          </td> */}

                          <td className="px-3 py-4 text-sm text-light-gray capitalize">
                            {order.status === "pending" && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-500 text-zinc-200">
                                {order.status}
                              </span>
                            )}

                            {order.status === "processing" && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-700 text-zinc-200">
                                {order.status}
                              </span>
                            )}

                            {order.status === "shipped" && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-zinc-200">
                                {order.status}
                              </span>
                            )}

                            {order.status === "delivered" && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-600 text-zinc-200">
                                {order.status}
                              </span>
                            )}
                          </td>

                          <td className="pr-8 text-sm text-light-gray w-0 text-right">
                            ₹{order?.totalPrice.toFixed(2)}
                          </td>

                          {/* Edit */}
                          <td className="relative py-4 px-4 text-sm font-medium">
                            {order?.paymentStatus === "Not paid" ? (
                              <Link
                                style={{ cursor: "not-allowed" }}
                                className="text-gray-500"
                              >
                                Edit
                              </Link>
                            ) : (
                              <Link
                                to={`/edit-order/${order?._id}`}
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
