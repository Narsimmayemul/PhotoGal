import React, { useState, useRef } from "react";
import {
  Button,
  Box,
  Typography,
  IconButton,
  Slider,
  Modal,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import ReactFlow, { Handle, Position } from "react-flow-renderer";
import Draggable from "react-draggable";

const Home = () => {
  const [images, setImages] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [resize, setResize] = useState(100); // Default resize percentage
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [isEditing, setIsEditing] = useState(false);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleImageUpdate = (index) => {
    setSelectedImageIndex(index);
    setIsEditing(true);
  };

  const applyEdits = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = images[selectedImageIndex];

    image.onload = () => {
      const width = image.width * (resize / 100);
      const height = image.height * (resize / 100);
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = `brightness(${brightness}%)`;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(image, -width / 2, -height / 2, width, height);
      ctx.restore();

      const updatedImage = canvas.toDataURL();
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[selectedImageIndex] = updatedImage;
        return newImages;
      });

      setIsEditing(false);
    };
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const renderGridLayout = () => {
    return (
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {images.map((image, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <img
              src={image}
              alt={`uploaded-${index}`}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => handleImageUpdate(index)}
            >
              <Edit />
            </IconButton>
            <IconButton
              sx={{ position: "absolute", bottom: 0, right: 0 }}
              onClick={() => handleImageDelete(index)}
            >
              <Delete />
            </IconButton>
          </Box>
        ))}
      </Box>
    );
  };

  const renderTreeLayout = () => {
    const elements = images.map((image, index) => ({
      id: `node-${index}`,
      type: "customNode",
      data: {
        label: (
          <Box sx={{ position: "relative" }}>
            <img
              src={image}
              alt={`uploaded-${index}`}
              style={{ width: "100px", height: "auto" }}
            />
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => handleImageUpdate(index)}
            >
              <Edit />
            </IconButton>
            <IconButton
              sx={{ position: "absolute", bottom: 0, right: 0 }}
              onClick={() => handleImageDelete(index)}
            >
              <Delete />
            </IconButton>
          </Box>
        ),
      },
      position: { x: Math.random() * 400, y: index * 100 },
    }));

    return (
      <ReactFlow
        elements={elements}
        style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}
      >
        {elements.map((el) => (
          <Handle
            key={el.id}
            type="source"
            position={Position.Bottom}
            id={`${el.id}-bottom`}
            style={{ background: "#555" }}
          />
        ))}
      </ReactFlow>
    );
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h4">Image Upload with Editing Features</Typography>

      <Button variant="contained" component="label">
        Upload Images
        <input
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </Button>

      {/* <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant={layout === "grid" ? "contained" : "outlined"}
          onClick={() => setLayout("grid")}
        >
          Grid Layout
        </Button>
        <Button
          variant={layout === "tree" ? "contained" : "outlined"}
          onClick={() => setLayout("tree")}
        >
          Tree Layout
        </Button>
      </Box> */}

      <Box sx={{ mt: 3, width: "100%" }}>
        {layout === "grid" ? renderGridLayout() : renderTreeLayout()}
      </Box>

      <Modal open={isEditing} onClose={() => setIsEditing(false)}>
        <Draggable>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: 2,
              boxShadow: 24,
              cursor: "move",
            }}
          >
            <Typography variant="h6">Edit Image</Typography>

            <Typography>Resize</Typography>
            <Slider
              value={resize}
              min={50}
              max={200}
              onChange={(e, newValue) => setResize(newValue)}
              aria-labelledby="resize-slider"
            />

            <Typography>Rotation</Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              onChange={(e, newValue) => setRotation(newValue)}
              aria-labelledby="rotation-slider"
            />

            <Typography>Brightness</Typography>
            <Slider
              value={brightness}
              min={50}
              max={150}
              onChange={(e, newValue) => setBrightness(newValue)}
              aria-labelledby="brightness-slider"
            />

            <Button variant="contained" onClick={applyEdits}>
              Apply Edits
            </Button>

            <canvas ref={canvasRef} style={{ display: "none" }} />
          </Box>
        </Draggable>
      </Modal>
    </Box>
  );
};

export default Home;
