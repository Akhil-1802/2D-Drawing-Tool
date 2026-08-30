import './App.css'
import { useRef } from 'react'
function App() {
  const canvasRef = useRef(null)
  return <div className='h-screen w-screen'>
      <canvas ref={canvasRef} className='w-full h-full border '/>
  </div>
}

export default App
