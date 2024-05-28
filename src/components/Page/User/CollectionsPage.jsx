import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../../utils/firebaseConfig';
import ErrorPlaceholder from "../../assets/error.jpg"
import { Grid } from '@mui/material';
import ItemProduct from '../Product/ListProduct/ItemProduct';

const CollectionsPage = () => {
    const {collection_name, subcollection_name} = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const unsubscribe = onSnapshot(
            collection(db, subcollection_name),
            (snapshot) => {
              if (!snapshot.empty) {
                const productsData = snapshot.docs.map((doc) => doc.data());
                console.log(productsData);
                setProducts(productsData);
              } else {
                console.log("No documents found in the collection.");
                setProducts([]); 
              }
              setLoading(false);
            },
            (error) => {
              console.error("Error fetching data: ", error);
              setLoading(false);
            }
          );
          return () => unsubscribe(); 
        } catch (error) {
          console.error("Error fetching product data: ", error);
          setLoading(false);
        }
      };
    
      fetchProduct();
    }, [subcollection_name]);
    

    const collectionProductCount = Array.isArray(products)
    ? products.length
    : null;
  return (
    <div>
       <p className="breadcrumbs">
        <Link to={"/"} key="home">
          Home /
        </Link>{" "}
        {collection_name} {">"} {subcollection_name}
      </p>
      <div>
        {collectionProductCount === 0 ? (
          <div className="emptyWishList">
            <img src={ErrorPlaceholder} alt="emptywishlist" width={300} style={{mixBlendMode:"multiply"}}/>
            <h2>No Products to display!</h2>
          </div>
        ) : (
          <Grid container rowSpacing={2} columnSpacing={2.5} sx={{margin:"auto"}}>
            {Array.isArray(products)
              ? products.map((item) => (
                <Grid item xs={10} sm={12} md={6} lg={4} sx={{display:"flex", alignItems:"center", justifyContent:"center"}} key={item.id}>
                  <ItemProduct product={item} loading={loading} subcollection_name={subcollection_name}/>
                  </Grid>
                ))
              : null}
          </Grid>
        )}
      </div>
    </div>
  )
}

export default CollectionsPage
