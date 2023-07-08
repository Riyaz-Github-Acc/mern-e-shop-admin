/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

const Orders = ({ orders }) => {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-[#0f0f25]">
          <tr className="text-light-gray">
            <th
              scope="col"
              className="py-3.5 pl-4 text-left text-sm font-semibold sm:pl-6"
            >
              Order ID
            </th>
            <th
              scope="col"
              className="hidden px-4 py-3.5 text-left text-sm font-semibold lg:table-cell"
            >
              User Name
            </th>
            <th
              scope="col"
              className="hidden px-4 py-3.5 text-left text-sm font-semibold lg:table-cell"
            >
              Payment Status
            </th>
            <th
              scope="col"
              className="hidden px-4 py-3.5 text-left text-sm font-semibold sm:table-cell"
            >
              Order Date
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-semibold"
            >
              Delivery Date
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-semibold"
            >
              Status
            </th>

            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold w-0"
            >
              Total
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-semibold"
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

              <td className="hidden px-4 py-4 text-sm text-light-gray lg:table-cell">
                {order?.user?.userName}
              </td>

              <td className="hidden px-4 py-4 text-sm text-light-gray lg:table-cell capitalize">
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

              <td className="hidden px-4 py-4 text-sm text-light-gray lg:table-cell">
                {new Date(order?.createdAt).toLocaleDateString()}
              </td>

              <td className="hidden px-4 py-4 text-sm text-light-gray lg:table-cell">
                Unknown
              </td>

              <td className="hidden px-4 py-4 text-sm text-light-gray sm:table-cell capitalize">
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

              <td className="pr-8 py-4 text-sm text-light-gray w-0 text-right">
                ₹{order?.totalPrice.toFixed(2)}
              </td>

              <td className="py-4 px-4 pl-4 pr-4 text-sm font-semibold sm:pr-6">
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
    </>
  );
};

export default Orders;
