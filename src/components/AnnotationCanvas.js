import React, { useRef, useState, useEffect } from "react";

function AnnotationCanvas({ imageUrl, onSave }) {
  const canvasRef = useRef(null);
  const [img, setImg] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageUrl;
    image.onload = () => {
      setImg(image);
      const canvas = canvasRef.current;
      canvas.width = image.width;
      canvas.height = image.height;
      draw(image, boxes);
    };
  }, [imageUrl, boxes]);

  const draw = (image, boxes) => {
    if (!canvasRef.current || !image) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(image, 0, 0);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    boxes.forEach((b) => {
      ctx.strokeRect(b.x, b.y, b.w, b.h);
    });
  };

  const handleMouseDown = (e) => {
    const rect = e.target.getBoundingClientRect();
    setIsDrawing(true);
    setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;
    const rect = e.target.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    const w = endX - startPos.x;
    const h = endY - startPos.y;
    setBoxes([...boxes, { x: startPos.x, y: startPos.y, w, h }]);
    setIsDrawing(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black", cursor: "crosshair" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => onSave(boxes)}>Save Annotation</button>
      </div>
    </div>
  );
}

export default AnnotationCanvas;
