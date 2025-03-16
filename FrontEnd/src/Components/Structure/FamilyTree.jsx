import React, { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// Example Family Tree structure
const familyTreeStructure = [
  { id: 1, label: "Parent", children: [2, 3] },
  { id: 2, label: "Child 1", children: [4, 5] },
  { id: 3, label: "Child 2", children: [] },
  { id: 4, label: "Grandchild 1", children: [] },
  { id: 5, label: "Grandchild 2", children: [] },
];

const FamilyTree = () => {
  const [images, setImages] = useState({});

  const handleImageUpload = (nodeId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const newImage = URL.createObjectURL(file);
      setImages((prevImages) => ({ ...prevImages, [nodeId]: newImage }));
    };
    input.click();
  };

  const handleImageDelete = (nodeId) => {
    setImages((prevImages) => {
      const newImages = { ...prevImages };
      delete newImages[nodeId];
      return newImages;
    });
  };

  const renderNode = (node) => (
    <Box
      key={node.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      {images[node.id] ? (
        <img
          src={images[node.id]}
          alt={`node-${node.id}`}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover", // Ensures all images fill the box and maintain aspect ratio
            borderRadius: "8px",
          }}
        />
      ) : (
        <Box
          sx={{
            width: "100px",
            height: "100px",
            backgroundColor: "#ddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
          }}
        >
          No Image
        </Box>
      )}

      <Box>
        <IconButton onClick={() => handleImageUpload(node.id)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleImageDelete(node.id)}>
          <Delete />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        {node.children.length > 0 &&
          node.children.map((childId) =>
            renderNode(familyTreeStructure.find((n) => n.id === childId))
          )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Family Tree Layout</Typography>
      <Box>{renderNode(familyTreeStructure.find((n) => n.id === 1))}</Box>
    </Box>
  );
};

export default FamilyTree;
