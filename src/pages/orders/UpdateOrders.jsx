import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateOrderAction } from "../../redux/slices/orderSlices";

import Button from "../../components/Button";
import ErrorMsg from "../../components/messages/ErrorMsg";
import SuccessMsg from "../../components/messages/SuccessMsg";
import SpinLoading from "../../components/loaders/SpinLoading";

const UpdateOrders = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { order, error, loading, isUpdated } = useSelector(
    (state) => state?.orders
  );

  const [formData, setFormData] = useState({
    status: order?.status,
  });

  // Update formData when order status changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: order?.status,
    }));
  }, [order?.status]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update Handler
  const [updated, setUpdated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateOrderAction({ ...formData, id }));

    // Reset Form Data
    setFormData({
      status: "",
    });

    setUpdated(true);
  };

  useEffect(() => {
    if (isUpdated && updated) {
      // Redirect
      navigate("/");
    }
  }, [isUpdated, updated, navigate]);

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {isUpdated && <SuccessMsg message="Order Updated Successfully" />}

      {loading ? (
        <SpinLoading />
      ) : (
        <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
          <div className="flex flex-1 justify-center">
            <form
              className="flex flex-row items-end gap-5 md:gap-10 space-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-md font-medium text-zinc-200">
                  Update Status
                </label>
                <select
                  name="status"
                  onChange={onChange}
                  value={order?.status}
                  className="mt-2  block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px] border"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Button type="smallFormBtn">Update Status</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateOrders;
