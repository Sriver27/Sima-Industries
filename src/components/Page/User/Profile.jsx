import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/authContext";
import { db } from "../../../utils/firebaseConfig";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button, Box } from "@mui/material";
import bannerProfile from "../../assets/bannerProfile.png";
import userAvatar from "../../assets/blank-profile-picture.png";
import emptyWishList from "../../assets/EmptyWishList.svg";
import { TabTitle } from "../../../utils/tabTitlePage";
import CustomModal from "./CustomModal";
import { useDispatch } from "react-redux";
import "../User/Profile.css";
import "../Product/ListProduct/ItemProduct.css";
import { setModalType } from "../../../store/actions";

const Profile = () => {
  const [savedProduct, setSavedProduct] = useState([]);
  const [like, setLike] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  TabTitle(`Lalasia | Profile ${user?.email}`);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setSavedProduct(doc.data()?.savedProduct);
    });
  }, [user?.email]);

  const productRef = doc(db, "users", `${user?.email}`);
  const deleteProduct = async (passedID) => {
    if (user?.email) {
      setLike(false);
    }
    try {
      const result = savedProduct.filter((item) => item.id !== passedID);
      await updateDoc(productRef, {
        savedProduct: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsModalOpen = (type) => {
    setIsModalOpen(true);
    dispatch(setModalType(type));
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const SavedProductCount = Array.isArray(savedProduct)
    ? savedProduct.length
    : null;

  return (
    <React.Fragment>
      <div className="containerProfile">
        <div className="bannerUser">
          <img src={bannerProfile} alt="bannerProfile" />
          <div className="userAvatar">
            <img src={userAvatar} alt="userPict" />
          </div>
          <div className="userInfo">
            <h1>{user.displayName}</h1>
            <h3>{user.email}</h3>
            <Box className="btn-grp">
              <Button
                sx={{ marginRight: 2, borderRadius: 3, fontWeight: "bold" }}
                onClick={() => handleIsModalOpen("Category")}
                variant="outlined"
              >
                Add Category
              </Button>
              <Button
                sx={{ borderRadius: 3, fontWeight: "bold" }}
                onClick={() => handleIsModalOpen("Product")}
                variant="contained"
              >
                Add Product
              </Button>
            </Box>
          </div>
        </div>
      </div>

      <div className="titleSavedProduct">
        <h1>Produk yang sudah anda sukai</h1>
      </div>

      <div className="userSavedProduct">
        {SavedProductCount === 0 ? (
          <div className="emptyWishList">
            <img src={emptyWishList} alt="emptywishlist" width={300} />
            <h2>Tampak Nya Kamu Belum memasukan produk ke dalam Wishlist</h2>
            <p>Masuk menu product dan pilih produk yang ingin kamu sukai</p>
          </div>
        ) : (
          <>
            {Array.isArray(savedProduct)
              ? savedProduct.map((item) => (
                  <div className="itemProduct" key={item.id}>
                    <div className="itemWraper">
                      <a
                        onClick={() =>
                          navigate(`../product/${item.category}/${item.id}`)
                        }
                      >
                        <img src={item?.img} alt="ProductImage" />
                        <h1>{item?.nama}</h1>
                        <p>{item?.tagline}</p>
                        <h2>Rp.{numberWithCommas(item?.harga)}</h2>
                      </a>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteProduct(item.id)}
                        className="iconDeleteProduct"
                      >
                        <FontAwesomeIcon icon={faTrashCan} size="xl" />
                      </span>
                    </div>
                  </div>
                ))
              : null}
          </>
        )}
      </div>
      {isModalOpen && (
        <CustomModal open={isModalOpen} handleClose={handleClose} />
      )}
    </React.Fragment>
  );
};

export default Profile;
