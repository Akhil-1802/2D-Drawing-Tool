import './App.css'
import { useEffect, useRef, useState } from 'react'
function App() {
  const startPoint = useRef(null)
  const [shapes, setShapes ]= useState([])
  const [tool, setTool] = useState("rectangle")
  const isDrawing = useRef(false)
  const canvasRef = useRef(null)
  useEffect(()=>{
    
  },[])


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
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = Math.abs(x - startPoint.current.x);
    const height = Math.abs(y - startPoint.current.y);
    const rectX = Math.min(x, startPoint.current.x);
    const rectY = Math.min(y, startPoint.current.y);
      isDrawing.current = false;
      const shape = {
        type : "rectangle",
        x : rectX,
        y : rectY,
        width : width,
        height : height
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

    const width = Math.abs(x - startPoint.current.x); // if startpoint is (100,100)  and now we are at (200,200), then the width is 200-100, similarly for height
    const height = Math.abs(y - startPoint.current.y);
    const rectX = Math.min(x, startPoint.current.x);
    const rectY = Math.min(y, startPoint.current.y);
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    // Draw all completed shapes
  shapes.forEach((shape) => {
    drawShape(ctx, shape);
  });

    ctx.strokeRect(rectX,rectY,width ,height)
    console.log(x, y);
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
  }
  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    shapes.forEach((shape) =>{
      drawShape(ctx,shape)
    })


  },[shapes])
  return <div className='h-screen w-screen'>
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
