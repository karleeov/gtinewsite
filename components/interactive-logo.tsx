'use client'

import { motion, useDragControls } from 'framer-motion'
import { useState } from 'react'

export default function Component() {
  const [isDragging, setIsDragging] = useState(false)
  const controls = useDragControls()

  const Shape = ({ 
    type, 
    x 
  }: { 
    type: 'circle' | 'triangle' | 'square'
    x: string 
  }) => {
    const shapeContent = {
      circle: (
        <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold transition-colors duration-300 hover:bg-primary">
          G
        </div>
      ),
      triangle: (
        <div className="w-24 h-24 flex items-center justify-center">
          <div 
            className="w-0 h-0 
            border-l-[48px] border-l-transparent
            border-b-[84px] border-b-black hover:border-b-primary
            border-r-[48px] border-r-transparent
            transition-colors duration-300
            relative"
          >
            <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white text-3xl font-bold">
              T
            </span>
          </div>
        </div>
      ),
      square: (
        <div className="w-24 h-24 bg-black text-white flex items-center justify-center text-3xl font-bold transition-colors duration-300 hover:bg-primary">
          I
        </div>
      )
    }

    return (
      <motion.div
        drag
        dragControls={controls}
        dragMomentum={false}
        dragElastic={0.2}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className={`absolute ${x} cursor-grab active:cursor-grabbing`}
      >
        {shapeContent[type]}
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-8">
      {/* Text part */}
      <motion.div
        className="text-center mb-12 select-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-4xl font-light tracking-widest mb-2">
          GLOBAL•TECHNOLOGY
        </h1>
        <h2 className="text-2xl md:text-4xl font-light tracking-[1em]">
          INTEGRATOR
        </h2>
      </motion.div>

      {/* GTI Logo part */}
      <div className="relative h-48 md:h-64">
        <Shape type="circle" x="left-1/4" />
        <Shape type="triangle" x="left-1/2 -translate-x-1/2" />
        <Shape type="square" x="right-1/4" />
      </div>

      <p className="text-center text-muted-foreground mt-8">
        {isDragging ? "Release to drop" : "Drag the shapes to move them around"}
      </p>
    </div>
  )
}