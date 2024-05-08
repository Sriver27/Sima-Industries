import React from "react";
import { TextField } from "@mui/material";

const AddCategoryForm = ({ handleSetCategory }) => {
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Enter Category"
        variant="outlined"
        fullWidth
        onChange={(e) => handleSetCategory(e.target.value)}
      />
    </div>
  );
};

export default AddCategoryForm;
