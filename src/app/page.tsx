"use client"

import React, { useState, useCallback } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Upload, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplitScreenImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const isImageFile = (file: File) => {
    return file.type.startsWith('image/');
  };

  const handleImageUpload = useCallback((file: File) => {
    if (!isImageFile(file)) {
      return;
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
      setIsUploaded(true)
      setTimeout(() => setIsUploaded(false), 2000)
    }
    reader.readAsDataURL(file)
  }, [])

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file)
    }
  }, [handleImageUpload])

  return (
    <div className="h-screen w-full bg-black text-white">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full p-8 flex flex-col">
            <h1 className="text-4xl font-bold mb-4">ImageSplit</h1>
            <p className="text-lg text-gray-400 mb-8">
              Transform your images instantly with our split-view editor
            </p>
            <div className="flex-grow flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-yellow-500/30 to-green-500/30 blur-3xl opacity-20 rounded-full" />
              <div className="relative z-10 bg-black/40 p-8 rounded-2xl backdrop-blur-xl border border-white/10">
                <AnimatePresence>
                  {isUploaded && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 rounded-2xl"
                    >
                      <CheckCircle className="w-20 h-20 text-green-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <label
                  htmlFor="image-upload"
                  className="w-64 h-64 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-all duration-300"
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  {selectedImage ? (
                    <img src={selectedImage} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-400">
                        {isDragging ? 'Drop image here' : 'Click or drag image here'}
                      </span>
                    </>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file)
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </Panel>
        <PanelResizeHandle className="w-px bg-gray-800 hover:bg-gray-700 transition-colors" />
        <Panel minSize={30}>
          <div className="h-full p-8 flex items-center justify-center">
            <span className="text-lg text-gray-400">Preview Area</span>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  )
}
