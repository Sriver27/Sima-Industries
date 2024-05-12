// import "./styles.css";
import styled from "styled-components";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState } from "react";
import ReactFileReader from "react-file-reader";
import { Button } from "@material-ui/core";
import { Clear } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    object-fit: cover;
    border-radius: 50%;
  }
  .circle {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    right: 23em !important;
    position: absolute;
    width: 48px;
    height: 48px;
    background: #312e38;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #f4ede8;
    }
    &:hover {
      background: blue;
    }
  }
`;

const CrossIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background-color: black;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function CustomUploadButton({
  handleSetDbImageUrl,
  handleSetFile,
}) {
  const defaultImgUrl =
    "https://img.lovepik.com/element/45018/0152.png_860.png";
  const [url, setUrl] = useState(defaultImgUrl);

  const handleFiles = (e) => {
    // console.log(files);
    // setUrl(files.base64);
    console.log(e.target.files);
    handleSetFile(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

  const clearImage = () => {
    setUrl(defaultImgUrl);
  };

  return (
    <div className="container" style={{paddingTop: "25px",
      paddingBottom: "15px"}}>
      <div>
        {url !== defaultImgUrl && (
          <AvatarInput>
            <img src={url} alt="Avatar Placeholder" />
            <CrossIcon onClick={clearImage}>
              <Clear style={{ color: "white", fontSize: 18 }} />
            </CrossIcon>
          </AvatarInput>
        )}

        {url === defaultImgUrl && (

          <div>
          <label htmlFor="file-upload" className="custom-file-upload">
            <Stack direction="row" spacing={1}>

           <CloudUploadIcon sx={{paddingRight:1, color:"black"}}/>Upload
            </Stack>
      </label>
          <input id="file-upload" type="file" accept="image/*" onChange={handleFiles}/>
          </div>
        )}
      </div>
    </div>
  );
}
