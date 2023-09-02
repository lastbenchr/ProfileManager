  import React, { useState } from "react";
  import axios from "axios";
  import { Image } from "cloudinary-react";
  import styled from "styled-components";
import Loader from "./utils/Loader";



  const StyledImage = styled(Image)`
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 50%;
    border: 1px solid #cbcbcc;
    cursor: ${(props) => (props.isEditable ? "pointer" : "")};
  `;

  const ImageWrapper = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    `

  const ImageInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;    
    opacity: 0;
  `

  const RoundedImage = ({imgSrc, handleInputChange, isEditable}) => {
    const [isUploading, setIsUploading] = useState(false);


    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      setIsUploading(true);

      // Upload the selected image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "j7srbmgm"); // Replace this with your Cloudinary upload preset
      formData.append("cloud_name", "dqtcqgy4k"); // Replace this with your Cloudinary cloud name

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dqtcqgy4k/image/upload`,
          formData
        );

        // Set the image URL to the uploaded image URL from Cloudinary
         handleInputChange("picture",response.data.secure_url)
      } catch (error) {
        console.error("Error uploading image:", error);
      }finally {
        setIsUploading(false); 
      }
    };
    return (
      <ImageWrapper>
        { isUploading &&   <Loader/> }
        <StyledImage
          cloudName="dqtcqgy4k" // Replace this with your Cloudinary cloud name
          publicId={imgSrc}
          width="100"
          height="100"
          crop="fill" 
          radius="max"
          isEditable={isEditable}
        />
        { isEditable && <ImageInput
          type="file"
          accept="image/*"
          title={isEditable ? "Click to upload image" : null} 
          onChange={handleImageChange}
        />}
      </ImageWrapper>
    );
  };

  export default RoundedImage;  
