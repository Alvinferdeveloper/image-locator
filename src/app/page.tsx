"use client"
import React from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import useImageUpload from '@/app//hooks/useImageUpload';
import useExtractExifData from '@/app/hooks/useExtractExifData';
import NoCoordinatesMessage from '@/app/components/noCoordinatesMessage';
import MainSection from '@/app/components/mainSection';
import dynamic from 'next/dynamic';

const Map = dynamic(
  () => import('@/app/components/map'),
  {
    ssr: false,
    loading: () => <div>Cargando mapa...</div>
  }
);

export default function Home() {
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
    <div className="w-full bg-gray-900 text-white flex flex-col">
      <div className="h-screen max-lg:hidden">
        <PanelGroup direction="horizontal" className="h-full">
          <Panel defaultSize={50} minSize={30}>
            <div className='overflow-y-auto h-full'>
              <MainSection
                selectedImage={selectedImage}
                isUploaded={isUploaded}
                isDragging={isDragging}
                handleImageUpload={handleImageUpload}
                handleDragEvents={handleDragEvents}
                exifData={exifData}
                handleExtractExifData={handleExtractExifData}
              />
            </div>
          </Panel>
          <PanelResizeHandle className="w-px bg-gray-800 hover:bg-gray-700 transition-colors" />
          <Panel defaultSize={50} minSize={30}>
            <div className="relative h-full w-full flex items-center justify-center">
              {
                exifData?.coordinates ? <Map coordinates={exifData.coordinates} /> : <span className="text-lg text-gray-400">Image Location</span>
              }
              <NoCoordinatesMessage noCoordinates={noCoordinates} />
            </div>
          </Panel>
        </PanelGroup>
      </div>
      <div className="relative flex flex-col gap-y-4 lg:hidden overflow-hidden">
        <MainSection
          selectedImage={selectedImage}
          isUploaded={isUploaded}
          isDragging={isDragging}
          handleImageUpload={handleImageUpload}
          handleDragEvents={handleDragEvents}
          exifData={exifData}
          handleExtractExifData={handleExtractExifData}
        />
        {
          exifData?.coordinates && <Map coordinates={exifData.coordinates} />
        }
        <NoCoordinatesMessage noCoordinates={noCoordinates} />
      </div>
    </div>
  );
}
