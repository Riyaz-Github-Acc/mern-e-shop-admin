import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AddOutlined } from "@mui/icons-material";
import { fetchUsersAction } from "../redux/slices/userSlices";

import Button from "../components/Button";
import ErrorMsg from "../components/messages/ErrorMsg";
import SpinLoading from "../components/loaders/SpinLoading";
import NoDataFound from "../components/messages/NoDataFound";

export default function Customers() {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  //get coupons
  const {
    users: { users },
    loading,
    error,
  } = useSelector((state) => state?.users);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-white capitalize">
            users List - ({users?.length})
          </h2>
          <p className="mt-2 text-md text-light-gray">
            List of all the users in the store.
          </p>
        </div>
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="/add-product">
            <Button type="loginBtn">
              <div className="flex flex-row items-center gap-1">
                <AddOutlined />
                <span>Add New Product</span>
              </div>
            </Button>
          </Link>
        </div> */}
      </div>

      {loading ? (
        <SpinLoading />
      ) : error ? (
        <ErrorMsg message={error?.message} />
      ) : users?.length <= 0 ? (
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
                        className="py-3.5 pl-4 text-left text-sm font-semibold sm:pl-6"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        Email
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        Phone
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        Country
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        State
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        City
                      </th>

                      {/* <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        Postal Code
                      </th> */}

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        Role
                      </th>

                      {/* <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        Action
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-light-blue">
                    {users?.map((user) => (
                      <tr key={user.email}>
                        <td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={user?.image}
                                alt={user?.name}
                              />
                            </div>
                            <div className="font-medium text-white">
                              {user?.userName}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-light-gray">
                          {user?.email}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-light-gray">
                          {user?.shippingAddress?.phone}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-light-gray">
                          {user?.shippingAddress?.country}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-light-gray">
                          {user?.shippingAddress?.state}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-light-gray">
                          {user?.shippingAddress?.city}
                        </td>

                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-light-gray">
                          {user?.shippingAddress?.postalCode}
                        </td> */}

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                          {user?.isAdmin ? "Admin" : "Customer"}
                        </td>

                        {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6 lg:pr-8">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </a>
                        </td> */}
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
