/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Login from "../pages/Login";
import ErrorMsg from "./messages/ErrorMsg";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userToken"));
  if (!user) {
    return <Login />;
  }

  const isAdmin = user?.user?.isAdmin ? true : false;
  if (!isAdmin) {
    return (
      <>
        <ErrorMsg message="Access denied! Only admins can access!" />
        <Login />
      </>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
