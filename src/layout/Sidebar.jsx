import {
  KeyboardArrowRight,
  SpaceDashboardOutlined,
  Inventory2Outlined,
  PeopleAltOutlined,
  AddShoppingCartOutlined,
  ShoppingBasketOutlined,
  SellOutlined,
  DiscountOutlined,
  AddCircleOutlineOutlined,
  InventoryOutlined,
  PaletteOutlined,
  CameraEnhanceOutlined,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("activeLink", location.pathname);
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    setActiveLink(storedActiveLink || "/");
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setOpen(window.innerWidth > 768);
    };

    handleWindowResize(); // Set initial state based on window width

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const menus = [
    { title: "Dashboard", icon: <SpaceDashboardOutlined />, href: "/" },
    // { title: "Orders", icon: <Inventory2Outlined />, href: "/orders" },
    {
      title: "Customers",
      icon: <PeopleAltOutlined />,
      href: "/customers",
    },
    {
      title: "Add Product",
      icon: <AddShoppingCartOutlined />,
      href: "/add-product",
      gap: true,
    },
    {
      title: "Manage Stocks",
      icon: <ShoppingBasketOutlined />,
      href: "/manage-stocks",
    },
    {
      title: "Add Coupon",
      icon: <SellOutlined />,
      href: "/add-coupon",
      gap: true,
    },
    {
      title: "Manage Coupons",
      icon: <DiscountOutlined />,
      href: "/manage-coupons",
    },
    {
      title: "Add Categories",
      icon: <AddCircleOutlineOutlined />,
      href: "/category-to-add",
      gap: true,
    },
    {
      title: "Categories List",
      icon: <InventoryOutlined />,
      href: "/categories-list",
    },
    {
      title: "Colors List",
      icon: <PaletteOutlined />,
      href: "/colors-list",
    },
    {
      title: "Brands List",
      icon: <CameraEnhanceOutlined />,
      href: "/brands-list",
    },
  ];

  return (
    <div
      className={`${
        open ? "w-80" : "w-20"
      } relative bg-dark-blue border-r border-light-gray duration-300 z-20`}
    >
      <div className={`sticky top-0 left-0 h-screen p-5`}>
        <div
          className={`absolute top-[69px] -right-[13px] border border-light-gray rounded-full bg-light-white cursor-pointer duration-200 z-30 ${
            open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        >
          <KeyboardArrowRight fontSize="medium" />
        </div>

        <Link to="/" className="flex items-center gap-4 text-lg">
          <img
            src="/favicon.png"
            alt="logo"
            className="w-9 h-9 object-contain"
          />

          <h2 className={`${!open && "scale-0"} font-semibold tracking-widest`}>
            MERNeShop
          </h2>
        </Link>

        <ul className="flex flex-col gap-1 pt-10 text-light-gray">
          {menus.map((menu, index) => (
            <li
              key={index}
              className={`${
                menu.gap ? "mt-5" : ""
              } hover:bg-light-white rounded-md hover:text-white ${
                activeLink === menu.href ? "bg-light-white text-white" : ""
              }`}
            >
              <Link
                to={menu.href}
                className="flex flex-row items-center gap-3 p-2"
                onClick={() => setActiveLink(menu.href)}
              >
                <div>{menu.icon}</div>
                <div
                  className={`${
                    !open && "hidden"
                  } text-md whitespace-nowrap origin-left duration-200`}
                >
                  {menu.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
