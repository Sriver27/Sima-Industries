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

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeProduct, setActiveProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(6);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
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
  }, []);

  const indexOfLastPage = currentPage * productPerPage;
  const indexOfFirstPage = indexOfLastPage - productPerPage;
  const currentOfPage = filtered.slice(indexOfFirstPage, indexOfLastPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (searchProduct !== "") {
      const filteredList = product.filter((item) =>
        item.productName.toLowerCase().includes(searchProduct.toLowerCase()) ||
        item.productDescription.toLowerCase().includes(searchProduct.toLowerCase()) ||
        item.categoryType.toLowerCase().includes(searchProduct.toLowerCase())
      );
      setFiltered(filteredList);
    } else {
      setFiltered(product);
    }
  }, [searchProduct, product]);

  return (
    <React.Fragment>
      {product.length > 0 && <div className="productPageSearchbar">
        <form className="productPageSearchbox">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Property"
            value={searchProduct}
            onChange={(event) => {
              setSearchProduct(event.target.value);
            }}
          />
        </form>
      </div>}

      {filtered.length !== 0 ? (
        <>
          <ListCategories
            product={product}
            setFiltered={setFiltered}
            activeProduct={activeProduct}
            setActiveProduct={setActiveProduct}
          />

          <div className="productList">
            {currentOfPage.map((product) => (
              <ItemProduct key={product.id} product={product} loading={loading} />
            ))}
          </div>

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
