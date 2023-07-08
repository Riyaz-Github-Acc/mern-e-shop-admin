import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateOrderAction } from "../../redux/slices/orderSlices";

const UpdateOrders = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const order = useSelector((state) => state.orders.order);

  const onChange = (e) => {
    dispatch(updateOrderAction({ status: e.target.value, id }));
  };

  useEffect(() => {
    if (order && order.status) {
      navigate("/"); // Redirect after the status is updated
    }
  }, [order, navigate]);

  return (
    <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
      <div className="flex flex-1 justify-center">
        <div>
          <label className="block text-md font-medium text-zinc-200">
            Update Status
          </label>
          <select
            name="status"
            onChange={onChange}
            value={order?.status || ""}
            className="mt-2  block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px] border"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrders;
