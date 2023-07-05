/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { CalendarMonthOutlined } from "@mui/icons-material";

import Button from "../../components/Button";
import ErrorMsg from "../../components/messages/ErrorMsg";
import SuccessMsg from "../../components/messages/SuccessMsg";
import CircularLoading from "../../components/loaders/CircularLoading";
import { createCouponAction } from "../../redux/slices/couponSlices";

export default function AddCoupon() {
  // Dispatch
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [formData, setFormData] = useState({
    code: "",
    discount: "",
  });

  //---handleOnChange---
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get Data from Store
  const { loading, isAdded, error } = useSelector((state) => state?.coupons);

  //---handleOnSubmit---
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createCouponAction({
        code: formData?.code,
        discount: formData?.discount,
        startDate,
        endDate,
      })
    );

    // Reset Form
    setFormData({
      code: "",
      discount: "",
    });
  };

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {isAdded && <SuccessMsg message="Bravo, coupon created successfuly" />}

      <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white tracking-wider">
            Add New Coupon
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-light-blue py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="flex flex-col gap-0 lg:gap-3 space-y-4"
              onSubmit={handleOnSubmit}
            >
              <div>
                <label className="block text-md font-medium text-zinc-200">
                  Coupon Code
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleOnChange}
                    value={formData?.code}
                    type="text"
                    name="code"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px]"
                  />
                </div>
              </div>

              {/* Discount */}
              <div>
                <label className="block text-md font-medium text-zinc-200">
                  Discount (in %)
                </label>
                <div className="mt-2">
                  <input
                    name="discount"
                    value={formData?.discount}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px]"
                  />
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-md font-medium text-zinc-200">
                  Start Date
                </label>
                <div className="mt-2 relative">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    // isClearable={true}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px] bg-[rgba(0,0,0,1)] cursor-pointer"
                  />
                  <CalendarMonthOutlined className="absolute top-3 right-3" />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-md font-medium text-zinc-200">
                  End Date
                </label>
                <div className="mt-2 relative">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px] bg-[rgba(0,0,0,1)] cursor-pointer"
                  />
                  <CalendarMonthOutlined className="absolute top-3 right-3" />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                {loading ? (
                  <Button type="smallFormBtn" disabled>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <div>Loading...</div>
                      <CircularLoading />
                    </div>
                  </Button>
                ) : (
                  <Button type="smallFormBtn">Add Coupon</Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
