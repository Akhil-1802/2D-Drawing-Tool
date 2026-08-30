import './App.css'
import { useEffect, useRef, useState } from 'react'
function App() {
  const startPoint = useRef(null)
  const [shapes, setShapes ]= useState([])
  const [tool, setTool] = useState("circle")
  const isDrawing = useRef(false)
  const canvasRef = useRef(null)
  

  const handleMouseDown = (e) =>{
    console.log(e)
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    console.log(rect)
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(x,y)
    startPoint.current = {
        x,
        y
    };

    isDrawing.current = true;

  }

  const handleMouseUp = (e) =>{
    if(!isDrawing.current) return;
    if(isDrawing.current){
      isDrawing.current = false;
      let shape;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if(tool == "rectangle"){
        const width = Math.abs(x - startPoint.current.x);
    const height = Math.abs(y - startPoint.current.y);
    const rectX = Math.min(x, startPoint.current.x);
    const rectY = Math.min(y, startPoint.current.y);
       shape = {
        type : "rectangle",
        x : rectX,
        y : rectY,
        width : width,
        height : height
      }
      }
      else if(tool == "circle"){
          const startX = startPoint.current.x;
const startY = startPoint.current.y;

const left = Math.min(startX, x);
const top = Math.min(startY, y);
const diameter = Math.min(
    Math.abs(x - startX),
    Math.abs(y - startY)
);

const centerX = left + diameter / 2;
const centerY = top + diameter / 2;

const radius = Math.min(
    Math.abs(x - startX),
    Math.abs(y - startY)
) / 2;

        shape = {
        type : "circle",
        cx : centerX,
        cy : centerY,
        r : radius,
        }
      }
      console.log(shape)
      setShapes(prev => [...prev , shape])
      }
    }
  
  const handleMouseMove = (e) =>{
    if(!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    
    if(tool == "rectangle"){
      const width = Math.abs(x - startPoint.current.x); // if startpoint is (100,100)  and now we are at (200,200), then the width is 200-100, similarly for height
    const height = Math.abs(y - startPoint.current.y);
    const rectX = Math.min(x, startPoint.current.x);
    const rectY = Math.min(y, startPoint.current.y);
    
    ctx.strokeRect(rectX,rectY,width ,height)
    console.log(x, y);
    }

    else if(tool == "circle"){
      const startX = startPoint.current.x;
const startY = startPoint.current.y;

const left = Math.min(startX, x);
const top = Math.min(startY, y);
const diameter = Math.min(
    Math.abs(x - startX),
    Math.abs(y - startY)
);

const centerX = left + diameter / 2;
const centerY = top + diameter / 2;

const radius = Math.min(
    Math.abs(x - startX),
    Math.abs(y - startY)
) / 2;

      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2
    );

    ctx.stroke();
    }
    // Draw all completed shapes
  shapes.forEach((shape) => {
    drawShape(ctx, shape);
  });
  }
  function drawShape(ctx, shape) {

    if (shape.type === "rectangle") {

        ctx.strokeRect(
            shape.x,
            shape.y,
            shape.width,
            shape.height
        );
    }
    else if (shape.type === "circle") {

        ctx.beginPath();

        ctx.arc(
            shape.cx,
            shape.cy,
            shape.r,
            0,
            Math.PI * 2
        );

        ctx.stroke();
    }
  }


  return <div className='h-screen w-screen'>
    <div className='flex gap-2  p-3'>
      <button className='p-1 border bg-green-200 cursor-pointer' onClick={() => setTool("rectangle")}>
    Rectangle
    </button>

    <button className='p-1 border bg-green-200 cursor-pointer' onClick={() => setTool("circle")}>
    Circle
    </button>
    </div>
      <canvas ref={canvasRef} 
      width={1200} 
      height={700} 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className='border'/>
  </div>
}

export default App
