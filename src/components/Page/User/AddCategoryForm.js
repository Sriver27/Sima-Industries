import React from "react";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";

const AddCategoryForm = ({ handleSetCategory, category }) => {
  const {isGlobalDisable} = useSelector((state)=>state.common)
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Enter Category"
        variant="outlined"
        disabled={isGlobalDisable}
        value={category}
        fullWidth
        onChange={(e) => handleSetCategory(e.target.value)}
      />
    </div>
  );
};

export default AddCategoryForm;
