import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { numberWithCommas } from "../../../../utils/numberWithCommas";
import { stack as Menu } from "react-burger-menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/authContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/firebaseConfig";
import {
  faUser,
  faArrowRightFromBracket,
  faCartFlatbed,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";

import "../Navbar/Navbar.css";
import "../Navbar/DropMenuUser.css";
import "../Navbar/DropMenuCart.css";
import "../Navbar/HamburgerMenu.css";

import Logo from "../../../assets/logo2_cropped.png";
import MenuHamburgerIcon from "../../../assets/HamburgerMenuIcon.png";
import CrossIcon from "../../../assets/CrossIcon.png";
import UserProfilePict from "../../../assets/blank-profile-picture.png";
import EmptyCartImg from "../../../assets/EmptyCart.png";

const Navbar = () => {
  const [userCart, setUserCart] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const activeClassName = "Active";

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setUserCart(doc.data()?.cartProduct);
    });
  }, [user?.email]);

  const itemCount = Array.isArray(userCart) ? userCart.length : null;

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <div className="Navigation">
      <Link to="/">
        <img src={Logo} alt="Logo" className="logomobile" style={{width:"110px", transform:"scale(1.3)"}}/>
      </Link>

      <div className="hamburgermenumobile">
        

        <Menu
          width={"100%"}
          customBurgerIcon={<img src={MenuHamburgerIcon} />}
          customCrossIcon={<img src={CrossIcon} />}
          isOpen={isOpen}
          onOpen={handleIsOpen}
          onClose={handleIsOpen}
          right
        >
          <div className="ButtonNav">
            {user?.email ? (
              <div className="profileNcart">
                <div className="profileNname">
                  <img src={UserProfilePict} alt="" width={50} />
                  <p>{user.email}</p>
                </div>
                <div className="menuUser">
                  <div className="profileBtn">
                    <FontAwesomeIcon icon={faUser} size="sm" />
                    <Link to="/profile" onClick={closeSideBar}>
                      Profile
                    </Link>
                  </div>

                  <div className="logOutBtn">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="sm" />
                    <a
                      onClick={() => {
                        handleLogout();
                        closeSideBar();
                      }}
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="loginNSignUpMobile">
                <Link to="/signup">
                  <button className="btnSignUp"> SignUp </button>
                </Link>

                <Link to="/login">
                  <button className="btnLogIn"> LogIn </button>
                </Link>
              </div>
            )}
          </div>

          <Link className="menu-item" to="/" onClick={closeSideBar}>
            Home
          </Link>

          <Link className="menu-item" to="/product" onClick={closeSideBar}>
            Product
          </Link>

        </Menu>
      </div>

      <nav>
        <ul className="ListMenu">
          <li className="Menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Home
            </NavLink>
          </li>

          <li className="Menu">
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Products
            </NavLink>
          </li>

        </ul>
      </nav>

      {user?.email ? (
        <div className="ButtonUserLogin">
          
          <div className="dropDownUser">
            <button className="btnUserAccount">
              <img src={UserProfilePict} alt="" />
            </button>

            <div className="dropdownContent">
              <p>{user.email}</p>

              <div className="profileBtn">
                <FontAwesomeIcon icon={faUser} size="xl" />
                <Link to="/profile">Profile</Link>
              </div>

              <div className="logOutBtn">
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />
                <a onClick={handleLogout}>Log Out</a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ButtonNav">
          <Link to="/signup">
            <button className="btnSignUp"> SignUp </button>
          </Link>

          <Link to="/login">
            <button className="btnLogIn"> LogIn </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
