import React, { useState } from "react";
import "./Header.css";
import Logo from "../../assets/sabhyata-logo.svg";
import { Link, Outlet } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import UserLogin from "../../components/Login/UserLogin";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Header = () => {
  const [userloginpopup, setUserloginpopup] = useState(false);
  const cartQuantityselect = useSelector((state) => state.changeProduct);
  const [cartQuantity, setcartQuantity] = useState("");
  useEffect(() => {
    setcartQuantity(cartQuantityselect);
  }, [cartQuantityselect]);
  console.log("cartQuantity>>>>", cartQuantity);

  const navBarMenu = [
    {
      name: "New In",
      link: "/trendings",
    },
    {
      name: "Women top wear",
      link: "/topwear",
    },
    {
      name: "Women Bottom wear",
      link: "/Women-bottom-wear",
    },
    {
      name: "Utsav Collection",
      link: "/utsavcollection",
    },
    {
      name: "Men",
      link: "/men",
    },
  ];
  const login_popUp = () => {
    console.log("Login");
    setUserloginpopup(true);
  };
  const close_login_popUp = () => {
    console.log("Login");
    setUserloginpopup(false);
  };
  return (
    <>
      <marquee className="marquee" bgcolor="black" color="#fff">
        Get 10% Off On Your First Purchase | Use Code - Welcome10
      </marquee>
      <div className="header__container">
        <header className="header">
          <div className="header__logo">
            <Link to="/">
              <img src={Logo} alt="logo" className="header_logo_img" />
            </Link>
          </div>

          <nav className="header__nav">
            {navBarMenu.map((item) => {
              return (
                <Link to={"/products" + item.link} key={item.name}>
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <Outlet />
        </header>
        <div className="login_container_svgs">
          <SearchIcon />
          <PermIdentityIcon onClick={login_popUp} />
          <FavoriteBorderIcon />
          <Link to={"/cart"} className="cart">
            <LocalMallIcon />
            <span className="cartQty">{cartQuantity.count}</span>
          </Link>
        </div>
      </div>
      <UserLogin
        userloginstate={userloginpopup}
        close_popUp={close_login_popUp}
      />
    </>
  );
};

export default Header;
