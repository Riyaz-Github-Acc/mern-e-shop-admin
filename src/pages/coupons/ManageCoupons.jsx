/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteCouponAction,
  fetchCouponsAction,
} from "../../redux/slices/couponSlices";

import Button from "../../components/Button";
import ErrorMsg from "../../components/messages/ErrorMsg";
import SpinLoading from "../../components/loaders/SpinLoading";
import NoDataFound from "../../components/messages/NoDataFound";
import { AddCommentOutlined } from "@mui/icons-material";

export default function ManageCoupons() {
  // Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCouponsAction());
  }, [dispatch]);

  // Get Coupons
  const {
    coupons: { coupons },
    loading,
    error,
  } = useSelector((state) => state?.coupons);

  //---deleteHandler---
  const handleDeleteCoupon = (id) => {
    dispatch(deleteCouponAction(id));

    // Reload
    window.location.reload();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-white capitalize">
            Coupons List - ({coupons?.length})
          </h2>
          <p className="mt-2 text-md text-light-gray">
            List of all the coupons in the store.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="add-coupon">
            <Button type="loginBtn">
              <AddCommentOutlined /> Add New Coupon
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <SpinLoading />
      ) : error ? (
        <ErrorMsg message={error?.message} />
      ) : coupons?.length <= 0 ? (
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
                        className="py-5 pl-4 text-left text-sm font-semibold sm:pl-6"
                      >
                        Code
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        Percentage (%)
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
                        Start Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        End Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        Days Left
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        Edit
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-light-blue">
                    {coupons?.map((coupon) => (
                      <tr key={coupon._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                          {coupon?.code}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-light-gray">
                          {coupon?.discount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-light-gray">
                          {coupon?.isExpired ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-700 text-gray-300">
                              Expired
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-light-gray">
                          {new Date(coupon.startDate)?.toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-light-gray">
                          {new Date(coupon.endDate)?.toLocaleDateString()}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-light-gray">
                          {coupon?.daysLeft}
                        </td>
                        {/* edit icon */}
                        <td className="relative whitespace-nowrap py-4 px-4 text-right text-sm font-medium">
                          <Link
                            to={`/edit-coupon/${coupon._id}`}
                            className="text-cyan-800 hover:text-cyan-900"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6 cursor-pointer"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Link>
                        </td>
                        {/* delete */}
                        <td className="relative whitespace-nowrap py-4 px-4 text-left text-sm font-medium">
                          <button
                            onClick={() => handleDeleteCoupon(coupon?._id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 cursor-pointer"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
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
  );
}
