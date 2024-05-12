import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../utils/databaseapi";
import { numberWithCommas } from "../../../../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import "./SearchProduct.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/firebaseConfig";

const SearchProduct = () => {
  const navigate = useNavigate();
  const [productSearch, setProductSearch] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      onSnapshot(collection(db, "products"), (snapshot) => {
        const productsData = snapshot.docs.map((doc) => doc.data())
        setProductSearch(productsData);
        setLoading(false);
      });
    };
    if(searchText){
      fetchProduct();
    }
  }, [searchText]);

  const handleSearch = (event) => {
    const searchWord = event.target.value;
    setSearchText(searchWord)
    const newFilter = productSearch.filter((value) => {
      return value.productName.toLowerCase().includes(searchWord.toLowerCase()) || 
      value.categoryType.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setSearchData([]);
    } else {
      setSearchData(newFilter);
    }
  };

  return (
    <div className="productSearchbar">
      <form className="productSearchbox">
        <input
          type="text"
          search="search"
          name="search"
          id="search"
          placeholder="Search Property"
          onChange={handleSearch}
        />
      </form>
      {searchData.length != 0 && (
        <div className="dataResult">
          {searchData.slice(0, 3).map((value) => {
            return (
              <a
                key={value.id}
                className="dataItem"
                onClick={() =>navigate(`product/${value.categoryType}/${value.id}`)}>
                <img src={value.imageUrl} alt={value.productName} />
                <span>
                  <p>{value.categoryType}</p>
                  <h1>{value.productName}</h1>
                  <h2>Rs. {numberWithCommas(value.price)}</h2>
                </span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
