import { ExifData } from "@/app/types/exif";
import DropImageBox from "@/app/components/dropImageBox";
import ImageInformation from "@/app/components/imageInformation";

interface Props {
  selectedImage: string | null;
  isUploaded: boolean;
  isDragging: boolean;
  handleImageUpload: (file: File) => void;
  handleDragEvents: (e: React.DragEvent<HTMLLabelElement>, isDragging: boolean) => void;
  exifData: ExifData | undefined
}
export default function ImageUpload({
  selectedImage,
  isUploaded,
  isDragging,
  handleImageUpload,
  handleDragEvents,
  exifData

}: Props) {
  return (
    <div className="relative z-10 bg-gray-800/80 p-8 rounded-2xl backdrop-blur-xl mb-3 border border-gray-700 w-full max-w-md shadow-lg">
      <DropImageBox
        selectedImage={selectedImage}
        isUploaded={isUploaded}
        isDragging={isDragging}
        handleDragEvents={handleDragEvents}
        handleImageUpload={handleImageUpload}
      />
      {exifData?.imageInfo && (
        <ImageInformation imageInfo={exifData.imageInfo} />
      )}
    </div>
  );
};