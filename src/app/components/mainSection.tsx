import { ExifData } from "../types/exif";
import ImageUpload from "./imageUpload";
interface Props {
    selectedImage: string | null;
    isUploaded: boolean;
    isDragging: boolean;
    handleImageUpload: (file: File) => void;
    handleDragEvents: (e: React.DragEvent<HTMLLabelElement>, isDragging: boolean) => void;
    exifData: ExifData | undefined,
    handleExtractExifData: () => void
}

export default function MainSection({ selectedImage, isUploaded, isDragging, handleImageUpload, handleDragEvents, exifData, handleExtractExifData }: Props) {
    return (
        <div className="min-h-screen p-8 pb-2 flex flex-col overflow-auto">
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
                className="w-full mb-2 rounded-md p-2 bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!selectedImage}
                onClick={handleExtractExifData}
            >
                Procesar Imagen
            </button>
        </div>
    )
}
