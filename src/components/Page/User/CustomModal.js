import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CustomModalForm from "./CustomModalForm";
import { IconButton } from "@mui/material";
import AddProductForm from "./AddProductForm";
import { useSelector } from "react-redux";

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

export default function CustomModal({ open, handleClose }) {
  const [category, setCategory] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [productCategory, setProductCategory] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [dbImageUrl, setDbImageUrl] = React.useState('')
  const { modalType } = useSelector((state) => state.modal);

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

  const handleSetDbImageUrl = (val) => {
    setDbImageUrl(val)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
            Add {modalType}
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
            dbImageUrl={dbImageUrl}
            productCategory={productCategory}
            handleSetDbImageUrl={handleSetDbImageUrl}
            handleSetFile = {handleSetFile}
            handleClose={handleClose}
          />
          {/* <AddProductForm /> */}
        </Box>
        {/* <Footer /> */}
      </Modal>
    </div>
  );
}
