import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ItemProduct.css";
import { numberWithCommas } from "../../../../utils/numberWithCommas";
import { useNavigate, useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Chip } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {Stack} from "@mui/material";
import { subCollections } from "../../../../utils/utils";

const ItemProduct = ({ product, loading, isProfileWindow = false, deleteProduct, isAdmin,handleUpdate, subcollection_name="" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const iconSubPath = subCollections?.[product.categoryType]?.icon;
  if (loading) {
    return <Skeleton count={5} />;
  }

  const handleDelete = (productId, event) => {
    // Prevent the default behavior of the event (navigation in this case)
    event.preventDefault();
    // Stop the event from propagating further (e.g., to the parent <a> tag)
    event.stopPropagation();
    // Call the deleteProduct function
    deleteProduct(productId);
  };

  const handleUpdateItem = (productId, event) => {
    // Prevent the default behavior of the event (navigation in this case)
    event.preventDefault();
    // Stop the event from propagating further (e.g., to the parent <a> tag)
    event.stopPropagation();
    // Call the deleteProduct function
    handleUpdate(productId);
  };

  const handleClick = () => {
    let basePath="product";
    if(location.pathname.endsWith("/profile") || location.pathname.endsWith("/profile/")){
       basePath =  "product";
      }
      navigate(`/${basePath}/${product.categoryType}/${product.id}`);
  };

  return (
    <Card sx={{  width:"350px", borderRadius: "20px" }} className="products_list">
        {/* <a onClick={handleClick}> */}
    <CardActionArea onClick={handleClick}>
      <div className="itemWraper">
          {isAdmin && isProfileWindow && <Stack direction = "row" useFlexGap flexWrap="wrap" justifyContent={"flex-end"}>
          <span
                        style={{ cursor: "pointer", marginTop:"20px" }}
                        onClick={(e)=>handleUpdateItem(product.id, e)}
                        className="isUpdateProductDetails"
                      >
                        <FontAwesomeIcon icon={faEdit} size="xl" />
                      </span>
                      <span
                        style={{ cursor: "pointer", marginTop:"20px" }}
                        onClick={(e) => handleDelete(product.id, e)}
                        className="iconDeleteProduct"
                      >
                        <FontAwesomeIcon icon={faTrashCan} size="xl" />
                      </span>
          </Stack>}
        <CardMedia component="img" className="productImg"
           image={product.imageUrl} alt="ProductImage" sx={{height:"30vh",borderTopLeftRadius:"20px", borderTopRightRadius:"20px"}}/>
          <CardContent sx={{paddingBottom:0}}>
          <Typography gutterBottom variant="h6" component="div">{product.productName}</Typography>
          {subcollection_name != ""?<Stack direction={"row"} spacing={2} sx={{mb:0.7}}>

          <p style={{padding:"5px 0 8px 0"}}>{product.categoryType}</p>
          <Chip
            avatar={<Avatar alt={subcollection_name} src={require(`../../../assets/${iconSubPath}`)} />}
            label={subcollection_name}
            variant="outlined"
            sx={{color:"green", fontWeight:"bold"}}
          />
          </Stack>:<p >{product.categoryType}</p>}
          <Typography gutterBottom variant="h5" component="div">Rs.{numberWithCommas(product.price)}</Typography>
          </CardContent>
      </div>
      </CardActionArea>
        {/* </a> */}
      </Card>
  );
};

export default ItemProduct;
