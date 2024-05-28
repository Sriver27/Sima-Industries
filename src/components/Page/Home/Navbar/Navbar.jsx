import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { numberWithCommas } from "../../../../utils/numberWithCommas";
import { stack as Menu } from "react-burger-menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/authContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/firebaseConfig";
import ShortcutIcon from '@mui/icons-material/Shortcut';
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
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dns, KeyboardArrowDown, People, PermMedia, Public } from "@mui/icons-material";
import { collections, subCollections } from "../../../../utils/utils";
import Dresser from "../../../assets/dresser.png"

const Navbar = () => {
  const [userCart, setUserCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const activeClassName = "Active";

  const [openStates, setOpenStates] = useState({});

  const collectionKeys = Object.keys(subCollections);

  const data = [
    { icon: <People/>, label: 'Authentication' },
    { icon: <Dns />, label: 'Database' },
    { icon: <PermMedia />, label: 'Storage' },
    { icon: <Public />, label: 'Hosting' },
  ];

  
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
    setIsOpen(!isOpen);
  };

  const closeSideBar = () => {
    setIsOpen(false);
  };

  const toggleOpen = (key) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
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

          <Link className="menu-item" to="/" onClick={closeSideBar} style={{paddingBottom:'20px'}}>
            Home
          </Link>

          <Link className="menu-item" to="/product" onClick={closeSideBar} style={{paddingBottom:'20px'}}>
            All Products
          </Link>

          {collectionKeys.map((item, index) => {
            const isOpen = openStates[item];
            const iconSubPath = subCollections[item].icon
            const subItems = subCollections?.[item]?.items;
            const currCollection = item;
            const subItemsLen = subItems?.length ?? 0;
            return (
              <Box
              sx={{
                pb: isOpen ? 2 : 0,
              }}
              key={index}
            >
              {!subItems?.length > 0? 
              <Link key={index} to="product" state = {{ collection: currCollection }} onClick={closeSideBar} style={{ textDecoration: 'none' }}>
              <ListItemButton
                alignItems="flex-start"
                onClick={() => toggleOpen(item)}
                sx={{
                  pr: 3,
                  pt: 0,
                  pb: isOpen ? 0 : 2.5,
                  pl:0
                }}
              >
                <img src={require(`../../../assets/${iconSubPath}`)}  alt={item} className="nav-icons"/>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                     fontSize: 19,
                    lineHeight: '20px',
                    mb: '2px',
                  }}
                 
                />
                {subItemsLen > 0 && <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    // opacity: 0,
                    transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                    color: '#000'
                  }}
                />}
              </ListItemButton>
              </Link>
              :
              <ListItemButton
                alignItems="flex-start"
                onClick={() => toggleOpen(item)}
                sx={{
                  pr: 3,
                  pt: 0,
                  pb: isOpen ? 0 : 2.5,
                  pl:0
                }}
              >
                <img src={require(`../../../assets/${iconSubPath}`)}  alt={item} className="nav-icons"/>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                     fontSize: 19,
                    lineHeight: '20px',
                    mb: '2px',
                  }}
                 
                />
                {subItems?.length > 0 && <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    // opacity: 0,
                    transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                    color: '#000'
                  }}
                />}
              </ListItemButton>}
              {isOpen && subItems &&
                subItems?.map((item, index) => (
                  <Link key={item.id} to={`collection/${currCollection}/${item.name}`} onClick={closeSideBar} style={{ textDecoration: 'none' }}>
                  <ListItemButton
                    key={item.id}
                    sx={{ py: 0, minHeight: 32, paddingLeft: '70px' }}
                  >
                    <img src="https://img.icons8.com/?size=100&id=YbccRm3XLf1f&format=png&color=000000" alt="" style={{paddingRight:10}} height={40}/>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{ fontSize: 18, fontWeight: 'medium', fontFamily: 'unset' }}
                    />
                  </ListItemButton>
                  </Link>
                ))}
            </Box>
            );
          })}
        </Menu>
      </div>

      {/* <nav>
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
      )} */}
    </div>
  );
};

export default Navbar;
