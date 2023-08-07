import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import styled from "styled-components";



const StyledImage = styled(Image)`
  width: 60px;
  height: auto;
  border-radius: 50%;
  border: 1px solid #cbcbcc;
`;


const RoundedImage = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://res.cloudinary.com/dqtcqgy4k/image/upload/v1691308587/lastbenchr/xenk71ickzlhplalpnb6.jpg" // Replace this with your default image URL
  );

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log("handke", e.target.files[0]);

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
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <StyledImage
        cloudName="dqtcqgy4k" // Replace this with your Cloudinary cloud name
        publicId={imageUrl}
        width="100"
        height="100"
        crop="fill"
        radius="max"
        onClick={() => document.getElementById("upload").click()}
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
