import UploadOverlay from "@/app/components/uploadOverlay";
import { Upload } from "lucide-react";

interface Props {
    selectedImage: string | null;
    isUploaded: boolean;
    isDragging: boolean;
    handleImageUpload: (file: File) => void;
    handleDragEvents: (e: React.DragEvent<HTMLLabelElement>, isDragging: boolean) => void;
}
export default function ImageUpload ({
    selectedImage,
    isUploaded,
    isDragging,
    handleImageUpload,
    handleDragEvents,
  }: Props) {
    return (
      <div className="relative z-10 bg-gray-800/80 p-8 rounded-2xl backdrop-blur-xl border border-gray-700 w-full max-w-md shadow-lg">
        <UploadOverlay isUploaded={isUploaded} />
        <label
         htmlFor="image-upload"
         className={`w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
           isDragging ? 'border-purple-400 bg-purple-800/20' : 'border-gray-600 hover:border-purple-500'
         }`}
          onDragOver={(e) => handleDragEvents(e, true)}
          onDragLeave={(e) => handleDragEvents(e, false)}
          onDrop={(e) => {
            handleDragEvents(e, false);
            const file = e.dataTransfer.files[0];
            if (file) handleImageUpload(file);
          }}
        >
          {selectedImage ? (
            <img src={selectedImage} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400" />
              <span className="mt-2 text-sm text-gray-400">
                {isDragging ? "Drop image here" : "Click or drag image here"}
              </span>
            </>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
        </label>
      </div>
    );
  };