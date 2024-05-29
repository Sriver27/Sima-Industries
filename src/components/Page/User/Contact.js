import { Typography } from '@mui/material'
import React from 'react'

const Contact = () => {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
      <Typography variant='h4' sx={{margin:"20px 0 10px 0"}}>Contact Us</Typography>
      <Typography variant='h6' sx={{mb:"20px", color:"gray", textAlign:"center", lineHeight:1}}>Get in touch with our team for any inquiries or assistance.</Typography>

      {/* <div style={{display:"flex", border:"1px solid #C0D6E8", marginTop:"50px", padding:"0px 5px 0px 16px"}}>
            <div style={{display:"flex", flexDirection:"column"}}> */}
            <Typography variant='h5' sx={{margin:"10px 0 0px 0", fontWeight:"400",color:"#002379"}}>Sima Industries</Typography>
            <Typography variant='h7' sx={{color:"gray", fontWeight:"400"}}>GST : 20AMGPT9853Q1Z7</Typography>
            <Typography variant='h6' sx={{margin:"10px 0 0px 0", fontWeight:"400"}}>Email</Typography>
            <Typography variant='h7' sx={{color:"gray", fontWeight:"400"}}>tunnutekriwal11@gmail.com</Typography>
            <Typography variant='h6' sx={{margin:"10px 0 0px 0", fontWeight:"400"}}>Phone</Typography>
            <Typography variant='h7' sx={{color:"gray", fontWeight:"400"}}>+91 7634035060</Typography>
            {/* </div> */}
            {/* <div style={{display:"flex",flexDirection:"column"}}> */}
            <Typography variant='h6' sx={{margin:"12px 0 0px 0", fontWeight:"400"}}>Address</Typography>
            <Typography variant='h7' sx={{color:"gray", fontWeight:"400"}}>Sleepwell Gallery, Nahar Chowk Godda</Typography>
            <Typography variant='h6' sx={{margin:"10px 0 0px 0", fontWeight:"400"}}>Business Hours</Typography>
            <Typography variant='h7' sx={{color:"gray", fontWeight:"400"}}>Monday - Friday: 9:00 AM - 9:00 PM</Typography>
            <Typography variant='h6' sx={{margin:"10px 0 0px 0", fontWeight:"400"}}>Map view location</Typography>
            <img width={"80px"} src={require('../../assets/qr.jpeg')} alt='google map view' style={{mixBlendMode:"multiply"}} />
            {/* </div> */}
      {/* </div> */}
    </div>
  )
}

export default Contact
