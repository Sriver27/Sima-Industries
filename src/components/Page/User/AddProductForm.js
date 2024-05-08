import React from "react";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import CustomUploadButton from "../../../utils/CustomUploadButton";

const AddProductForm = ({
  handleSetProduct,
  handleSetProductPrice,
  handleSetProductCategory,
  handleSetDbImageUrl,
  handleSetFile,
}) => {
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
        fullWidth
        onChange={(e) => handleSetProduct(e.target.value)}
      />
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={(e) => handleSetProductCategory(e.target.value)}
        label="Age"
      >
        <MenuItem value={"Table"}>Table</MenuItem>
        <MenuItem value={"Chair"}>Chair</MenuItem>
        <MenuItem value={"Wadrobe"}>Wadrobe</MenuItem>
      </Select>
      <TextField
        id="outlined-basic"
        label="Enter Price"
        variant="outlined"
        fullWidth
        onChange={(e) => handleSetProductPrice(e.target.value)}
        sx={{ marginTop: 2.5 }}
        InputProps={{
          startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
        }}
      />
    </div>
  );
};

export default AddProductForm;
