/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button";
import ErrorMsg from "../../components/messages/ErrorMsg";
import SuccessMsg from "../../components/messages/SuccessMsg";

import {
  fetchColorAction,
  updateColorAction,
} from "../../redux/slices/colorSlices";
import SpinLoading from "../../components/loaders/SpinLoading";

export default function UpdateColor() {
  const navigate = useNavigate();

  //get coupon from url
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();

  //---Fetch Color ---
  useEffect(() => {
    dispatch(fetchColorAction(id));
  }, [id, dispatch]);
  //Get Data from Store
  const { color, loading, error, isUpdated } = useSelector(
    (state) => state?.colors
  );

  //Form Data
  const [formData, setFormData] = useState({
    name: color?.color?.name,
  });

  // Update formData when product changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: color?.color?.name,
    }));
  }, [color?.color?.name]);

  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //onSubmit
  const [updated, setUpdated] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Dispatch
    dispatch(
      updateColorAction({ name: formData?.name, id: color?.color?._id })
    );

    //Reset Form
    setFormData({
      name: "",
    });

    setUpdated(true);
  };

  useEffect(() => {
    if (isUpdated && updated) {
      // Redirect
      navigate("/colors-list");
    }
  }, [isUpdated, updated, navigate]);

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {isUpdated && <SuccessMsg message="Color updated successfully" />}

      {loading ? (
        <SpinLoading />
      ) : (
        <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full">
            <h2 className="text-center text-2xl md:text-3xl font-bold text-white tracking-wider">
              Update Color
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
                    Brand Name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleOnChange}
                      value={formData?.name}
                      type="text"
                      name="name"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <Button type="smallFormBtn">Update Color</Button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-light-blue px-2 text-white">Or</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-row items-center justify-center gap-3">
                  <div className="flex items-center justify-center">
                    <Link to="/add-category" className="whitespace-nowrap">
                      <Button type="loginBtn">Add Category</Button>
                    </Link>
                  </div>

                  <div className="flex items-center justify-center">
                    <Link to="/add-brand" className="whitespace-nowrap">
                      <Button type="loginBtn">Add Brand</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
