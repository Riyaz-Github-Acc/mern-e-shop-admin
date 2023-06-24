import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-row text-semi-white">
      <Sidebar />
      <div className="bg-light-blue w-full">
        <Header />
        <div className="p-4 md:p-8">
          <div className="bg-dark-blue rounded-3xl p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
