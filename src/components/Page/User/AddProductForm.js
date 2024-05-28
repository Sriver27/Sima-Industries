import React from "react";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  Box,
  Chip,
} from "@mui/material";
import CustomUploadButton from "../../../utils/CustomUploadButton";
import { useSelector, useDispatch } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import { setCategoriesList } from "../../../store/actions";
import { collections, subCollections } from "../../../utils/utils";

const AddProductForm = ({
  handleSetProduct,
  handleSetProductPrice,
  handleSetProductCategory,
  handleSetDbImageUrl,
  handleSetFile,
  product,
  price,
  productCategory,
  productDesc,
  handleProductDescription,
  file,
  handleSetSubCollections,
  productSubCollections,
}) => {
  const {modal:{categories, isModalOpen}, common:{isGlobalDisable}} = useSelector(state=>state)
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = React.useState([]);
  const handleSetCategories = () => {
    onSnapshot(collection(db, "category"), (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => doc.data())
      // localStorage.setItem('categories', JSON.stringify(categoriesData));
      setCategoryList(categoriesData);
    });
    
  }

  React.useEffect(()=>{
    handleSetCategories();
  },[])
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
    >
      <CustomUploadButton
        handleSetDbImageUrl={handleSetDbImageUrl}
        handleSetFile={handleSetFile}
      />
      <TextField
        id="outlined-basic"
        label="Enter Product"
        variant="outlined"
        required
        disabled={isGlobalDisable}
        value={product}
        fullWidth
        onChange={(e) => handleSetProduct(e.target.value)}
      />
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        required
        onChange={(e) => handleSetProductCategory(e.target.value)}
        label="Age"
        disabled={isGlobalDisable}
        value={productCategory}
      >
        {categoryList.length != 0?categoryList.map((item) => (
          <MenuItem key={item.id} value={item.categoryType}>
            {item.categoryType}
          </MenuItem>
        )):
        <MenuItem  value={"No categories found"}>
            No categories found
        </MenuItem>
        }
      </Select>
      <InputLabel id="demo-simple-select-label">Sub-collection</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        required
        onChange={(e) => handleSetSubCollections(e.target.value)}
        label="Age"
        disabled={isGlobalDisable}
        value={productSubCollections}
      >
        {
        productCategory && subCollections?.[productCategory]?.items &&  subCollections?.[productCategory]?.length !== 0?subCollections?.[productCategory]?.items.map((item) => (
          <MenuItem key={item?.id} value={item?.name}>
            {item?.name}
          </MenuItem>
        )):
        <MenuItem  value={"No sub-collections present"}>
            No sub-collections present
        </MenuItem>
        }
      </Select>
      <TextField
        id="outlined-basic"
        label="Enter Price"
        variant="outlined"
        type="number"
        value={price}
        required
        disabled={isGlobalDisable}
        fullWidth
        onChange={(e) => handleSetProductPrice(e.target.value)}
        sx={{ marginTop: 2.5 }}
        InputProps={{
          startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
        }}
      />
      <TextField
        id="outlined-basic"
        label="Enter Product Description"
        variant="outlined"
        value={productDesc}
        disabled={isGlobalDisable}
        multiline
        rows={4}
        fullWidth
        onChange={(e) => handleProductDescription(e.target.value)}
        sx={{ marginTop: 2.5 }}
      />  
    </div>
  );
};

export default AddProductForm;
