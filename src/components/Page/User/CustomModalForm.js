import { useSelector } from "react-redux";

import React from "react";
import { Button, Box } from "@mui/material";
import AddCategoryForm from "./AddCategoryForm";
import AddProductForm from "./AddProductForm";
import { db, storage } from "../../../utils/firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { setIsGlobalDisabled, setIsUpdateProduct, setModalOpen } from "../../../store/actions";

const CustomModalForm = ({
  handleClose,
  handleSetCategory,
  handleSetProduct,
  handleSetProductPrice,
  handleSetProductCategory,
  category,
  product,
  price,
  productCategory,
  file,
  handleSetFile,
  productDesc,
  handleProductDescription,
  updateItemId=null
}) => {
  const { modal:{modalType}, common:{isGlobalDisable} } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [dbImageUrl, setDbImageUrl] = React.useState('')
  // const [imgUploading, setImgUploading] = React.useState(false)

  const handleSetDbImageUrl = (val) => {
    setDbImageUrl(val)
  }

  const handleUploadToDB = async() => {
    const id = updateItemId != null? updateItemId: uuidv4();
    if (file) {
      console.log(file);
      
      dispatch(setIsGlobalDisabled(true))
      const imageRef =  storageRef(storage, `products/${id}`);

    await uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log("img url:", url)
            setDbImageUrl(url)
            
      const value = collection(db, "products");
      const docRef = doc(value, id);
        
           setDoc(docRef, {
            id: id,
            productName: product,
            price: price,
            categoryType: productCategory,
            productDescription:productDesc,
            imageUrl: url,
          })
          dispatch(setIsGlobalDisabled(false))
          handleClose();
          if(updateItemId){
            dispatch(setIsUpdateProduct(false))
          }
    
          })
          .catch((error) => {
            console.log(error.message);
            dispatch(setIsGlobalDisabled(false))
            handleClose();
            if(updateItemId){
              dispatch(setIsUpdateProduct(false))
            }
            
          });
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(setIsGlobalDisabled(false))
        handleClose();
        if(updateItemId){
          dispatch(setIsUpdateProduct(false))
        }
        
      });

    }
  };

  const handleAddCategory = async() => {
    dispatch(setIsGlobalDisabled(true))
    const id = uuidv4();
    const value = collection(db, "category");
    await addDoc(value, { id: id, categoryType: category })
    dispatch(setIsGlobalDisabled(false))
    handleClose();
  }

  return (
    <div>
      {modalType === "Category" ? (
        <AddCategoryForm handleSetCategory={handleSetCategory} category={category} />
      ) : (
        <AddProductForm
          handleSetProduct={handleSetProduct}
          handleSetProductPrice={handleSetProductPrice}
          handleSetProductCategory={handleSetProductCategory}
          handleSetDbImageUrl={handleSetDbImageUrl}
          handleSetFile={handleSetFile}
          handleProductDescription={handleProductDescription}
          productDesc={productDesc}
          product={product}
          price={price}
          productCategory={productCategory}
          file={file}
        />
      )}
      <Box
        className="btn-grp"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 4,
        }}
      >
        <Button
          sx={{ marginRight: 2, borderRadius: 2, fontWeight: "bold" }}
          variant="outlined"
          onClick={handleClose}
          disabled={isGlobalDisable}
        >
          Cancel
        </Button>

        { modalType == "Category"?
         <Button
         sx={{ borderRadius: 2, fontWeight: "bold" }}
         variant="contained"
         onClick={()=>{handleAddCategory();}}
         disabled={isGlobalDisable}
       >
         {isGlobalDisable?<CircularProgress />:"Submit"}
       </Button>:
          <Button
          sx={{ borderRadius: 2, fontWeight: "bold" }}
          variant="contained"
          onClick={()=>{handleUploadToDB();}}
          disabled={isGlobalDisable}
        >
          {isGlobalDisable?<CircularProgress />:"Submit"}
        </Button>}
      </Box>
    </div>
  );
};

export default CustomModalForm;
