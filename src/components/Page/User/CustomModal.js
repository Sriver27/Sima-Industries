import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CustomModalForm from "./CustomModalForm";
import { IconButton } from "@mui/material";
import AddProductForm from "./AddProductForm";
import { useSelector } from "react-redux";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { setCategoriesList } from "../../../store/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const handleBackdropClick = (e) => {
  e.preventDefault();
};

export default function CustomModal({ open, handleClose, id=null }) {
  const [category, setCategory] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [productCategory, setProductCategory] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [productDesc, setProductDesc] = React.useState("")
  const [categories, setCategories] = React.useState([])
  const { modalType, isModalOpen } = useSelector((state) => state.modal);
  const { isUpdate } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  React.useEffect(()=>{
    if(id != null){
      fetchProductById(id)
    }
  },[id])

  const fetchProductById = async (productId) => {
    try {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const productData = docSnap.data();
        setProduct(productData.productName)
        setPrice(productData.price)
        setProductCategory(productData.categoryType)
        setProductDesc(productData.productDescription)
      } else {
        console.log("No such document!");
        
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      
    }
  };

  const handleSetCategory = (val) => {
    setCategory(val);
  };

  const handleSetProduct = (val) => {
    setProduct(val);
  };

  const handleSetProductPrice = (val) => {
    setPrice(val);
  };

  const handleSetProductCategory = (val) => {
    setProductCategory(val);
  };

  const handleSetFile = (val) => {
    setFile(val)
  }

 
  const handleProductDescription = (val) => {
    setProductDesc(val)
  }
 


  return (
    <div>
     
      <Modal
        open={isModalOpen}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown={true}
        BackdropProps={{
          onClick: handleBackdropClick,
        }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            {isUpdate?"Edit":"Add"} {modalType}
          </Typography>
          <CustomModalForm
            handleSetCategory={handleSetCategory}
            handleSetProduct={handleSetProduct}
            handleSetProductPrice={handleSetProductPrice}
            handleSetProductCategory={handleSetProductCategory}
            category={category}
            product={product}
            price={price}
            file = {file}
            updateItemId={id? id:null}
            productCategory={productCategory}
            handleProductDescription={handleProductDescription}
            productDesc = {productDesc}
            handleSetFile = {handleSetFile}
            handleClose={handleClose}
            categories={categories}
          />
          {/* <AddProductForm /> */}
        </Box>
        {/* <Footer /> */}
      </Modal>
    </div>
  );
}
