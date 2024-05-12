import React, { useEffect } from "react";
import "./ListCategories.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/firebaseConfig";

const ListCategories = ({setActiveProduct, activeProduct, setFiltered, product}) => {
  
  useEffect(() => {
    const filtered = product.filter((item) => {
      return item.categoryType === activeProduct;
    });
    setFiltered(filtered);
  }, [activeProduct]);

  const [categoryList, setCategoryList] = React.useState([]);
  const handleSetCategories = () => {
    onSnapshot(collection(db, "category"), (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => doc.data())
      setCategoryList(categoriesData);
    });
    
  }

  React.useEffect(()=>{
    handleSetCategories();
  },[])

  return (
    <div className="categories">
      <div className="tabs_wrap">
        <ul>
          {categoryList.map((category) => (
            <li className={activeProduct === category.categoryType? "active" : ""} key={category.id} onClick={() => setActiveProduct(category.categoryType)}>
              {category.categoryType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListCategories;
