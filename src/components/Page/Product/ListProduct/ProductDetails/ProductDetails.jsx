import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../../../../utils/databaseapi";
import { numberWithCommas } from "../../../../../utils/numberWithCommas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-regular-svg-icons";
import { UserAuth } from "../../../../context/authContext";
import { db } from "../../../../../utils/firebaseConfig";
import { arrayUnion, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import RelatedList from "./ProductRelated/RelatedList";
import Quantitiy from "./Quantitiy";
import ModalAddToCart from "./ModalAddToCart";
import { TabTitle } from "../../../../../utils/tabTitlePage";

import "react-loading-skeleton/dist/skeleton.css";
import "../ProductDetails/ProductDetails.css";
import "react-toastify/dist/ReactToastify.css";
import { Avatar, Chip, Stack } from "@mui/material";
import { subCollections } from "../../../../../utils/utils";
import CollectionImg from "../../../../assets/cabinet.png"

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  if (text !== undefined && text !== null) {
    return (
      <React.Fragment>
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? ".....Read more" : " Show less"}
        </span>
      </React.Fragment>
    );
  }
};

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [quantitiy, SetQuantitiy] = useState(1);
  const [modalCart, setModalCart] = useState(false);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    onSnapshot(collection(db, "products"), (snapshot) => {
      const productRelatedData = snapshot.docs.map((doc) => doc.data())
      console.log(productRelatedData)
      setProduct(productRelatedData.filter((item)=>item.id == id))
    });
  }, [id]);

  const notifyAddToWishList = () =>
    toast.success("Product successfully added to wishlist!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    TabTitle(`SimaIndustries | ${product[0]?.productName}`);

  return (
    <React.Fragment>
      
      <ToastContainer style={{ fontSize: "13px" }} />

      
      {(product && product[0]?.collection) ? <p className="breadcrumbs" style={{textAlign:"left",margin: "2% 9%"}}>
        <Link to={`/collection/${product[0]?.categoryType}/${product[0]?.collection}`} key="collection">
          Collection /
        </Link>{" "}
        {product[0]?.categoryType} {">"} {product[0]?.collection}
      </p>:
      <p className="breadcrumbs" style={{textAlign:"left", margin: "2% 9%"}}>
      <Link to={`/product`} key="products">
        All Products /
      </Link>{" "}
      {product[0]?.categoryType}
    </p>
      }
      <div className="productDetails">
        <img src={product[0]?.imageUrl} alt="productImage" />

        <div className="details">
          
          <h2 style={{margin:"10px 0"}}>{product[0]?.productName || <Skeleton />}</h2>
          {/* <h5>{product[0]?.categoryType || <Skeleton count={2} />}</h5> */}
          <Stack direction={"row"} spacing={1} sx={{mb:0.7}}>

          {product[0]?.categoryType && <Chip
            label={product[0]?.categoryType}
            variant="outlined"
            sx={{fontWeight:"bold"}}
             color="primary"
          />}
          {product[0]?.collection && <Chip
            label={product[0]?.collection}
            variant="outlined"
            sx={{fontWeight:"bold"}}
            color="secondary"
          />}
          </Stack>
          <h2>Rs.{numberWithCommas(product[0]?.price) || <Skeleton />}</h2>
          <h3 style={{marginBottom:"0px"}}>Product Description :</h3>
          <p style={{marginTop:"12px"}}>
            <ReadMore>{product[0]?.productDescription}</ReadMore>
          </p>

          
         
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetails;
