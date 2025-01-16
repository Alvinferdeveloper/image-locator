"use client"

import React from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import useImageUpload from '@/app//hooks/useImageUpload';
import ImageUpload from '@/app/components/imageUpload';
import ExifReader from 'exifreader';
import useExtractExifData from '@/app/hooks/useExtractExifData';

export default function SplitScreenImageUpload() {
  const {
    selectedImage,
    isUploaded,
    isDragging,
    handleImageUpload,
    handleDragEvents,
    arrayBuffer
  } = useImageUpload();
  const { extractExifData, exifData } = useExtractExifData();
  
  const handleExtractExifData = ()=> {
    extractExifData(arrayBuffer)
  }
  
  return (
    <div className="h-screen w-full bg-black text-white">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full p-8 flex flex-col">
            <h1 className="text-4xl font-bold mb-4">ImageSplit</h1>
            <button onClick={handleExtractExifData}>Enviar</button>
            <p className="text-lg text-gray-400 mb-8">
              Transform your images instantly with our split-view editor
            </p>
            <div className="flex-grow flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-yellow-500/30 to-green-500/30 blur-3xl opacity-20 rounded-full" />
              <ImageUpload
                selectedImage={selectedImage}
                isUploaded={isUploaded}
                isDragging={isDragging}
                handleImageUpload={handleImageUpload}
                handleDragEvents={handleDragEvents}
              />
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
  );
}
