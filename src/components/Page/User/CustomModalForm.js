import { useSelector } from "react-redux";

import React from "react";
import { Button, Box } from "@mui/material";
import AddCategoryForm from "./AddCategoryForm";
import AddProductForm from "./AddProductForm";
import { db, storage } from "../../../utils/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const CustomModalForm = ({
  handleSetCategory,
  handleClose,
  handleSetProduct,
  handleSetProductPrice,
  handleSetProductCategory,
  category,
  product,
  price,
  productCategory,
  file,
  dbImageUrl,
  handleSetDbImageUrl,
  handleSetFile,
}) => {
  const { modalType } = useSelector((state) => state.modal);

  const handleUpload = () => {
    if (file) {
      console.log(file);
      //   const storageRef = storage.ref();
      //   const fileRef = storageRef.child(file.name);
      //   fileRef.put(file);
      //   const url = fileRef.getDownloadURL();
      //   handleSetDbImageUrl(url);

      storage
        .ref("/images/" + file.name)
        .put(file)
        .on("state_changed", alert("Success"), alert, () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              handleSetDbImageUrl(url);
            });
        });

      // Save image URL to Firebase Database
      //   database.ref('images').push({ url });
    }
  };

  const handleSubmit = () => {
    const id = uuidv4();
    handleUpload();
    const value =
      modalType == "Category"
        ? collection(db, "category")
        : collection(db, "products");
    if (modalType == "Category") {
      addDoc(value, { id: id, categoryType: category });
    } else {
      if (id && product && price && productCategory && dbImageUrl) {
        addDoc(value, {
          id: id,
          productName: product,
          price: price,
          categoryType: productCategory,
          imageUrl: dbImageUrl,
        });
      }
    }
  };
  return (
    <div>
      {modalType === "Category" ? (
        <AddCategoryForm handleSetCategory={handleSetCategory} />
      ) : (
        <AddProductForm
          handleSetProduct={handleSetProduct}
          handleSetProductPrice={handleSetProductPrice}
          handleSetProductCategory={handleSetProductCategory}
          handleSetDbImageUrl={handleSetDbImageUrl}
          handleSetFile={handleSetFile}
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
        >
          Cancel
        </Button>
        <Button
          sx={{ borderRadius: 2, fontWeight: "bold" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default CustomModalForm;
