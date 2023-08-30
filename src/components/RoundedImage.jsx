  import React, { useEffect, useState } from "react";
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


  const RoundedImage = ({imgSrc, handleInputChange, isEditable, objectID}) => {
    const [imageUrl, setImageUrl] = useState(imgSrc);

    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
      setImageUrl(imgSrc); // Update imageUrl when imgSrc prop changes
    }, [imgSrc]);

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
        setImageUrl(response.data.secure_url);
        handleInputChange("picture",response.data.secure_url)
      } catch (error) {
        console.error("Error uploading image:", error);
      }finally {
        setIsUploading(false); 
      }
    };

    console.log("inside rounded image imgSrc",imgSrc, objectID);

    return (
      <div>
        {
          isUploading &&   <Loader/>
          
          }
        
        <StyledImage
          cloudName="dqtcqgy4k" // Replace this with your Cloudinary cloud name
          publicId={imageUrl}
          width="100"
          height="100"
          crop="fill"
          radius="max"
          onClick={() => isEditable ? document.getElementById("upload").click() : null}
          isEditable={isEditable}
          title={isEditable ? "Click to upload image" : null}
        />
        <input
          type="file"
          id="upload"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    );
  };

  export default RoundedImage;  
