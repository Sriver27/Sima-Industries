import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/authContext";
import { db } from "../../../utils/firebaseConfig";
import { updateDoc, doc, onSnapshot, collection, deleteDoc } from "firebase/firestore";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button, Box, Grid } from "@mui/material";
import bannerProfile from "../../assets/bannerProfile.png";
import userAvatar from "../../assets/blank-profile-picture.png";
import emptyWishList from "../../assets/EmptyWishList.svg";
import { TabTitle } from "../../../utils/tabTitlePage";
import CustomModal from "./CustomModal";
import { useDispatch, useSelector } from "react-redux";
import "../User/Profile.css";
import "../Product/ListProduct/ItemProduct.css";
import { setIsUpdateProduct, setModalOpen, setModalType } from "../../../store/actions";
import ItemProduct from "../Product/ListProduct/ItemProduct";
import ErrorPlaceholder from "../../assets/forbidden.jpeg"

const Profile = () => {
  const [addedProducts, setAddedProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [like, setLike] = useState(true);
  const [loading, setLoading] = useState(false);
   const [tobeUpdateItemId, settobeUpdateItemId] = useState("");
  const { user } = UserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.modal);
  const { isUpdate } = useSelector((state) => state.common);
  TabTitle(`Sima Industries | Profile ${user?.email}`);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      // setSavedProduct(doc.data()?.savedProduct);
      setLoading(true);
      setIsAdmin(doc.data()?.isAdmin)
      if(doc.data()?.isAdmin){
        handleAddedProductsList()
      }
    });
  }, [user?.email]);

  const handleAddedProductsList = async() => {
    try {
       onSnapshot(collection(db, "products"), (snapshot) => {
        const productsData = snapshot.docs.map((doc) => doc.data())
        setAddedProducts(productsData);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProduct = async (productId) => {
    if (!isAdmin) {
      return;
    }
    try {
      await deleteDoc(doc(db, "products", productId));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleIsModalOpen = (type) => {
    dispatch(setModalOpen(true))
    dispatch(setModalType(type));
  };

  const handleClose = () => {
    dispatch(setModalOpen(false))
  };

  const handleUpdate = (productId) => {
    settobeUpdateItemId(productId)
    dispatch(setIsUpdateProduct(true))
    handleIsModalOpen("Product")
  }

  const AddedProductCount = Array.isArray(addedProducts)
    ? addedProducts.length
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
            { isAdmin && <Box className="btn-grp">
              <Button
                sx={{ marginRight: 2, borderRadius: 3, fontWeight: "bold", mb:2 }}
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
            </Box>}
          </div>
        </div>
      </div>
{ isAdmin ? <>
      <div className="titleSavedProduct">
        <h1>Products added by you to the catalogue</h1>
      </div>

      <div>
        {AddedProductCount === 0 ? (
          <div className="emptyWishList">
            <img src={emptyWishList} alt="emptywishlist" width={300} />
            <h2>It looks like you haven't added the products to products catalogue</h2>
            <p>Simply hit the Add Product button and add a product to the catalogue</p>
          </div>
        ) : (
          <Grid container rowSpacing={2} columnSpacing={2.5} sx={{margin:"auto"}}>
            {Array.isArray(addedProducts)
              ? addedProducts.map((item) => (
                <Grid item xs={10} sm={12} md={6} lg={4} sx={{display:"flex", alignItems:"center", justifyContent:"center"}} key={item.id}>
                  <ItemProduct  product={item} loading={loading} isProfileWindow={true} deleteProduct={deleteProduct} isAdmin={isAdmin} handleUpdate={handleUpdate}/>
                  </Grid>
                ))
              : null}
          </Grid>
        )}
      </div>
      </>
      :
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop:"15px" }}>
          <img src={ErrorPlaceholder} alt="ErrorPlaceholder" width={600} style={{ mixBlendMode: "multiply" }} />
          <h2>You don't have admin access to add product to products list</h2>
        </div>
      }
      {isModalOpen && (
        isUpdate?
        <CustomModal handleClose={handleClose} id={tobeUpdateItemId}/>:
        <CustomModal handleClose={handleClose} />
      )}
    </React.Fragment>
  );
};

export default Profile;
