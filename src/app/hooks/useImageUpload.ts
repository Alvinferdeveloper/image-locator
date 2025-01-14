import { useState, useCallback } from "react";
export default function useImageUpload (){
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
  
    const isImageFile = (file: File) => file.type.startsWith("image/");
  
    const handleImageUpload = useCallback((file: File) => {
      if (!isImageFile(file)) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setIsUploaded(true);
        setTimeout(() => setIsUploaded(false), 2000);
      };
      reader.readAsDataURL(file);
    }, []);
  
    const handleDragEvents = useCallback(
      (e: React.DragEvent<HTMLLabelElement>, isDragging: boolean) => {
        e.preventDefault();
        setIsDragging(isDragging);
      },
      []
    );
  
    return {
      selectedImage,
      isUploaded,
      isDragging,
      handleImageUpload,
      handleDragEvents,
    };
  };