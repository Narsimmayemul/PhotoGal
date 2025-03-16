import React, { useState } from "react";
import ReactFlow, { Handle, Position } from "react-flow-renderer";
import { Button, Box, Typography } from "@mui/material";

const FlowchartLayout = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const elements = images.map((image, index) => ({
    id: `node-${index}`,
    type: "customNode",
    data: { label: <img src={image} alt={`uploaded-${index}`} style={{ width: "100px", height: "auto" }} /> },
    position: { x: Math.random() * 400, y: index * 100 },
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Flowchart Layout</Typography>

      <Button variant="contained" component="label">
        Upload Images
        <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
      </Button>

      <Box sx={{ width: "100%", height: "400px", mt: 3 }}>
        <ReactFlow elements={elements} style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}>
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
      </Box>
    </Box>
  );
};

export default FlowchartLayout;
