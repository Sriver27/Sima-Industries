import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

      
      <div className="productDetails">
        <img src={product[0]?.imageUrl} alt="productImage" />

        <div className="details">
          

          <h2>{product[0]?.productName || <Skeleton />}</h2>
          <h5>{product[0]?.categoryType || <Skeleton count={2} />}</h5>
          <p>
            <ReadMore>{product[0]?.productDescription}</ReadMore>
          </p>
          <h2>Rs.{numberWithCommas(product[0]?.price) || <Skeleton />}</h2>

          
         
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetails;
