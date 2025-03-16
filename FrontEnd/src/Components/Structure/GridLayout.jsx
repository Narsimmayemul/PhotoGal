import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const GridLayout = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Grid Layout</Typography>

      <Button variant="contained" component="label">
        Upload Images
        <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
      </Button>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, mt: 3 }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`uploaded-${index}`} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
        ))}
      </Box>
    </Box>
  );
};

export default GridLayout;
