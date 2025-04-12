import { useState } from 'react'
import BasicScene from './components/three/BasicScene'
import OptimizedScene from './components/three/OptimizedScene'
import InteractivePortal from './components/three/InteractivePortal'
import './App.css'

export default function App() {
  const [scene, setScene] = useState('basic') // 'basic', 'optimized', or 'portal'
  
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-900">
      <div className="absolute top-0 left-0 z-10 p-4 flex gap-4">
        <button 
          className={`px-4 py-2 rounded ${scene === 'basic' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setScene('basic')}
        >
          Basic Scene
        </button>
        <button 
          className={`px-4 py-2 rounded ${scene === 'optimized' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setScene('optimized')}
        >
          Optimized Scene
        </button>
        <button 
          className={`px-4 py-2 rounded ${scene === 'portal' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setScene('portal')}
        >
          Interactive Portal
        </button>
      </div>
      
      {scene === 'basic' ? <BasicScene /> : 
       scene === 'optimized' ? <OptimizedScene /> : 
       <InteractivePortal />}
    </div>
  )
}
