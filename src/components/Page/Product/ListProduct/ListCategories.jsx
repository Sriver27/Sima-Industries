import React, { useEffect } from "react";
import "./ListCategories.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/firebaseConfig";
import { Box, Chip, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

const ListCategories = ({setActiveProduct, activeProduct, setFiltered, product}) => {
 
  useEffect(() => {
    if(activeProduct != "All Products"){
      const filtered = product.filter((item) => {
        return item.categoryType === activeProduct;
      });
      setFiltered(filtered);
    }
    else{
      setFiltered(product);
    }
  
  }, [activeProduct]);


  const [categoryList, setCategoryList] = React.useState([]);
  const handleSetCategories = () => {
    onSnapshot(collection(db, "category"), (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => doc.data())
      const noneCategory = { id: 'all', categoryType: 'All Products' };
      // setCategoryList(categoriesData);
      const updatedCategoriesData = [noneCategory, ...categoriesData];
      setCategoryList(updatedCategoriesData);
    });
    
  }

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
  const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  React.useEffect(()=>{
    handleSetCategories();
  },[])

  return (
    // windowWidth < 800?
    // <div className="categories">
    //   {console.log("width:",windowWidth)}
    //   <div className="tabs_wrap">
    //     <ul>
    //       {categoryList.map((category) => (
    //         <li className={activeProduct === category.categoryType? "active" : ""} key={category.id} onClick={() => setActiveProduct(category.categoryType)}>
    //           {category.categoryType}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>:
    <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",mb:3, flexDirection:"column"}}>
  
      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={activeProduct}
    label=""
    onChange={(e)=>setActiveProduct(e.target.value)}
    className="list-categories"
  >
    {console.log(categoryList)}
    {categoryList?.map((category) => (
      <MenuItem key={category.id} value={category.categoryType}>
        {category.categoryType}
      </MenuItem>
    ))}
  </Select>
 
  </Box>
  );
};

export default ListCategories;
