import React, { useEffect, useState } from "react";

import Home from "../../assets/MainPage/Home.svg";
import Recycle from "../../assets/MainPage/Recycle.svg";
import Cart from "../../assets/MainPage/Cart.svg";
import MyInfo from "../../assets/MainPage/MyInfo.svg";

import ActiveHome from "../../assets/MainPage/ActiveHome.svg";
import ActiveRecycle from "../../assets/MainPage/ActiveRecycle.svg";
import ActiveCart from "../../assets/MainPage/ActiveCart.svg";
import ActiveMyInfo from "../../assets/MainPage/MyInfo.svg";

import { useLocation, useNavigate } from "react-router-dom";

import "../../styles/components/layout/Footer.scss";

const menus = [
  {
    name: "홈",
    url: "/",
    src: Home,
    activeSrc: ActiveHome,
  },
  {
    name: "거래내역",
    url: "/recycle",
    src: Recycle,
    activeSrc: ActiveRecycle,
  },
  {
    name: "장바구니",
    url: "/cart",
    src: Cart,
    activeSrc: ActiveCart,
  },
  {
    name: "내 정보",
    url: "/my",
    src: MyInfo,
    activeSrc: ActiveMyInfo,
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  console.log(activeMenu)
  return (
    <div className="Footer--Wrapper">
      {menus.map((menu) => {
        return (
          <div
            key={menu.name}
            className={`Footer--Menu ${
              activeMenu === menu.url ? "active" : ""
            }`}
            onClick={() => {
              setActiveMenu(menu.url);
              navigate(menu.url);
            }}
          >
            <img
              className="Footer--Menu--Icon"
              src={activeMenu !== menu.url ? menu.src : menu.activeSrc }
              alt="menu-icon"
            />

            <span
              className={`Footer--Menu--Text ${
                activeMenu === menu.url ? "active" : ""
              }`}
            >
              {menu.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
