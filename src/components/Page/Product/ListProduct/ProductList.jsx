import React, { useState, useEffect } from "react";
import { API_URL } from "../../../../utils/databaseapi";
import axios from "axios";
import Pagination from "./Pagination";
import ItemProduct from "./ItemProduct";
import ListCategories from "./ListCategories";
import "../../Home/SearchProduct/SearchProduct.css";
import "./ProductList.css";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/firebaseConfig";
import ErrorPlaceholder from "../../../assets/error.jpg"
import { Grid } from "@mui/material";

const ProductList = ({currTab = {}}) => {
  const [product, setProduct] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeProduct, setActiveProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(6);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(()=>{
    const fetchProduct = async () => {
      setLoading(true);
      onSnapshot(collection(db, "products"), (snapshot) => {
        const productsData = snapshot.docs.map((doc) => doc.data())
        setProduct(productsData);
        setFiltered(productsData)
        setLoading(false);
      });
    };
    fetchProduct();
    currTab != {} && setActiveProduct(currTab)
  },[])
  useEffect(() => {   
    if(activeProduct != "" && activeProduct != "All Products") {
      const filteredList =  product.filter((item) =>
        item.categoryType.toLowerCase().includes(activeProduct.toLowerCase())
      )
      setFiltered(filteredList)
    } else if(activeProduct == "All Products" ){
      setFiltered(product)
    }
  }, [activeProduct, product]);

  const indexOfLastPage = currentPage * productPerPage;
  const indexOfFirstPage = indexOfLastPage - productPerPage;
  const currentOfPage = filtered.slice(indexOfFirstPage, indexOfLastPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const filteredBySearch = searchProduct != ""
      ? product.filter((item) =>
          item.productName.toLowerCase().includes(searchProduct.toLowerCase()) ||
          item.productDescription.toLowerCase().includes(searchProduct.toLowerCase()) ||
          item.categoryType.toLowerCase().includes(searchProduct.toLowerCase())
        )
      : product;

    const filterByTabType = currTab != {} ? product.filter((item) =>
      item.categoryType.includes(currTab)
    ): filteredBySearch

   (currTab != {} || searchProduct != "") &&  setFiltered(filterByTabType);
  }, [searchProduct, product, currTab]);
  

  return (
    <React.Fragment>
      {product.length > 0 && <div className="productPageSearchbar">
        <form className="productPageSearchbox">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Product"
            value={searchProduct}
            onChange={(event) => {
              setSearchProduct(event.target.value);
            }}
          />
        </form>
      </div>}

      <ListCategories
        product={product}
        setFiltered={setFiltered}
        activeProduct={activeProduct}
        setActiveProduct={setActiveProduct}
      />
      {filtered.length !== 0 ? (
        <>

          {/* <div className="productList"> */}
          <Grid container rowSpacing={2} columnSpacing={2.5} sx={{margin:"auto"}}>
            {currentOfPage.map((product) => (
          <Grid item xs={10} sm={12} md={6} lg={4} sx={{display:"flex", alignItems:"center", justifyContent:"center"}} key={product.id}>
              <ItemProduct product={product} loading={loading} />
          </Grid>
            ))}
          {/* </div> */}
          </Grid>

          <Pagination
            productPerPage={productPerPage}
            totalProduct={filtered.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1>No Products to display!</h1>
          <img src={ErrorPlaceholder} alt="ErrorPlaceholder" width={600} style={{ mixBlendMode: "multiply" }} />
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductList;
