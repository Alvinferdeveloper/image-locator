"use client"
import { ExifData } from "./types/exif"
import dynamic from 'next/dynamic'

const Map = dynamic(
  () => import('@/app/components/map'),
  { 
    ssr: false, // Esto es importante
    loading: () => <div>Cargando mapa...</div>
  }
)

export default function MapSection({ exifData }: { exifData?: ExifData }) {
    return (
        <div className="relative h-full w-full flex items-center justify-center">
            {
                exifData?.coordinates ? <Map coordinates={exifData.coordinates} /> : <span className="text-lg text-gray-400">Image Location</span>
            }
        </div>
    )
}
