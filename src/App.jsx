import "./App.css";
import { useRef, useState } from "react";
function App() {
  const startPoint = useRef(null);
  const [shapes, setShapes] = useState([]);
  const [tool, setTool] = useState("circle");
  const isDrawing = useRef(false);
  const canvasRef = useRef(null);

  const handleMouseDown = (e) => {
    console.log(e);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    console.log(rect);
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(x, y);
    startPoint.current = {
      x,
      y,
    };

    isDrawing.current = true;
  };

  const handleMouseUp = (e) => {
    if (!isDrawing.current) return;
    if (isDrawing.current) {
      isDrawing.current = false;
      let shape;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const startX = startPoint.current.x;
      const startY = startPoint.current.y;
      if (tool == "rectangle") {
        const width = Math.abs(x - startX);
        const height = Math.abs(y - startY);
        const rectX = Math.min(x, startX);
        const rectY = Math.min(y, startY);
        shape = {
          type: "rectangle",
          x: rectX,
          y: rectY,
          width: width,
          height: height,
        };
      } else if (tool == "circle") {
        const dx = x - startX;
        const dy = y - startY;

        const radius = Math.hypot(dx, dy);

        shape = {
          type: "circle",
          cx: startX,
          cy: startY,
          r: radius,
        };
      } else if (tool === "line") {
        shape = {
          type: "line",

          x1: startX,
          y1: startY,

          x2: x,
          y2: y,
        };
      }

      console.log(shape);
      setShapes((prev) => [...prev, shape]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const startX = startPoint.current.x;
    const startY = startPoint.current.y;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (tool == "rectangle") {
      const width = Math.abs(x - startX); // if startpoint is (100,100)  and now we are at (200,200), then the width is 200-100, similarly for height
      const height = Math.abs(y - startY);
      const rectX = Math.min(x, startX);
      const rectY = Math.min(y, startY);
      ctx.fillText(
        `W: ${Math.abs(width).toFixed(1)} × H: ${Math.abs(height).toFixed(1)}`,
        x + 10,
        y - 10,
      );

      ctx.strokeRect(rectX, rectY, width, height);
      console.log(x, y);
    } else if (tool == "circle") {
      const dx = x - startX;
      const dy = y - startY;

      const radius = Math.hypot(dx, dy);

      ctx.beginPath();
      ctx.fillText(`Radius: ${radius.toFixed(1)} px`, x + 10, y - 10);
      ctx.arc(startX, startY, radius, 0, Math.PI * 2);

      ctx.stroke();
    } else if (tool == "line") {
      const dx = x - startX;
      const dy = y - startY;

      const length = Math.hypot(dx, dy);
      ctx.beginPath();
      ctx.fillText(`Length: ${length.toFixed(1)}cm`, x + 10, y - 10);
      ctx.moveTo(startX, startY);

      ctx.lineTo(x, y);
      ctx.stroke();
    }
    // Draw all completed shapes
    shapes.forEach((shape) => {
      drawShape(ctx, shape);
    });
  };
  function drawShape(ctx, shape) {
    if (shape.type === "rectangle") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();

      ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2);

      ctx.stroke();
    } else if (shape.type === "line") {
      ctx.beginPath();

      ctx.moveTo(shape.x1, shape.y1);

      ctx.lineTo(shape.x2, shape.y2);

      ctx.stroke();
    }
  }

  return (
    <div className="h-screen w-screen">
      <div className="flex gap-2  p-3">
        <button
          className="p-1 border bg-green-200 cursor-pointer"
          onClick={() => setTool("rectangle")}
        >
          Rectangle
        </button>

        <button
          className="p-1 border bg-green-200 cursor-pointer"
          onClick={() => setTool("circle")}
        >
          Circle
        </button>

        <button
          className="p-1 border bg-green-200 cursor-pointer"
          onClick={() => setTool("line")}
        >
          Line
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={1200}
        height={700}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="border"
      />
    </div>
  );
}

export default App;
