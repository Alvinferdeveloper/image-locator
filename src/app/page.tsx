"use client"

import React from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import useImageUpload from '@/app//hooks/useImageUpload';
import ImageUpload from '@/app/components/imageUpload';
import useExtractExifData from '@/app/hooks/useExtractExifData';
import Map from '@/app/components/map';
import { AnimatePresence, motion } from 'framer-motion'
import { MapPinOffIcon as MapOff } from 'lucide-react';

export default function SplitScreenImageUpload() {
  const {
    selectedImage,
    isUploaded,
    isDragging,
    handleImageUpload,
    handleDragEvents,
    arrayBuffer
  } = useImageUpload();
  const { extractExifData, exifData, noCoordinates } = useExtractExifData();

  const handleExtractExifData = () => {
    extractExifData(arrayBuffer)
  }

  return (
    <div className="h-screen w-full bg-gray-900 text-white flex flex-col">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full p-8 pb-2 flex flex-col overflow-y-auto">
            <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Descubre el Origen de tus Fotos
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Revela la historia detrás de tus imágenes. Identifica con precisión dónde fueron capturados tus momentos más preciados y descubre detalles fascinantes sobre sus ubicaciones.
            </p>
            <div className="flex-grow flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-orange-500/30 blur-3xl opacity-20 rounded-full" />
              <ImageUpload
                selectedImage={selectedImage}
                isUploaded={isUploaded}
                isDragging={isDragging}
                handleImageUpload={handleImageUpload}
                handleDragEvents={handleDragEvents}
                exifData={exifData}
              />
            </div>
            <button
              className="w-full mt-4 rounded-md p-2 bg-purple-600 hover:bg-purple-700 text-white"
              disabled={!selectedImage}
              onClick={handleExtractExifData}
            >
              Procesar Imagen
            </button>
          </div>
        </Panel>
        <PanelResizeHandle className="w-px bg-gray-800 hover:bg-gray-700 transition-colors" />
        <Panel minSize={30}>
          <div className="relative h-full w-full flex items-center justify-center">
            {
              exifData?.coordinates ? <Map coordinates={exifData.coordinates} /> : <span className="text-lg text-gray-400">Image Location</span>
            }
            {

              <AnimatePresence>
                {
                  noCoordinates === true && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute z-20 flex flex-col w-full h-full items-center justify-center bg-black/70 rounded-2xl"
                    >
                      <MapOff className="w-20 h-20 text-yellow-400 mb-4" />
                      <p className="text-white text-lg font-semibold text-center">
                        Esta imagen no posee datos de ubicación
                      </p>
                    </motion.div>
                  )
                }
              </AnimatePresence>

            }
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
