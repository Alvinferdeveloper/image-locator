import { useState, useCallback } from "react";
export default function useImageUpload (){
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer>()
  
    const isImageFile = (file: File) => file.type.startsWith("image/");
  
    const handleImageUpload = useCallback((file: File) => {
      if (!isImageFile(file)) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer], { type: file.type });
        const url = URL.createObjectURL(blob);

        setSelectedImage(url);
        setArrayBuffer(arrayBuffer);
        setIsUploaded(true);
        setTimeout(() => setIsUploaded(false), 2000);
      };
      reader.readAsArrayBuffer(file);
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
      arrayBuffer
    };
  };