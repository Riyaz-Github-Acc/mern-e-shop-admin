import {
  Person2,
  KeyboardArrowDown,
  Logout,
  SearchOutlined,
} from "@mui/icons-material";

import { useState } from "react";

import profilePic from "../assets/images/placeholders/profile-pic-placeholder.jpg";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 left-0 flex md:flex-row flex-col gap-4 items-center justify-between bg-dark-blue w-full border-b border-light-gray py-4 px-4 md:px-10 z-10">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-42 md:w-96 bg-light-blue text-md py-3 px-9 md:px-9 rounded-md outline-none focus:outline-none"
        />
        <SearchOutlined
          style={{ color: "#e4e4e7" }}
          className="absolute top-0 left-2 translate-y-[50%]"
        />
      </div>

      <div className="relative">
        <div
          className={`flex flex-row items-center gap-3 bg-light-white hover:bg-light-white-opacity border-b border-light-gray rounded-t-md px-6 py-2 cursor-pointer ${
            open && "bg-light-white-opacity"
          }`}
          onClick={() => setOpen(!open)}
        >
          <img
            src={profilePic}
            alt="profile-pic"
            className="w-8 h-8 rounded-full object-cover"
          />

          <div className="flex flex-row items-center gap-0">
            <h3 className="font-bold">Admin</h3>
            <div className={`${open && "rotate-180"}`}>
              <KeyboardArrowDown />
            </div>
          </div>
        </div>

        {open && (
          <div className="absolute flex flex-col text-zinc-200 bg-dark-blue rounded-b-md w-full z-10">
            <div className="flex flex-row gap-2 hover:bg-light-white font-medium hover:text-white py-2 px-10 rounded-md cursor-pointer">
              <Person2 />
              <span>Profile</span>
            </div>

            <div className="flex flex-row gap-2 text hover:bg-light-white font-medium hover:text-white py-2 px-10 rounded-md cursor-pointer">
              <Logout />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
