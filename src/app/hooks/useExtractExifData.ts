import ExifReader from 'exifreader';
import { useState } from 'react';
import { ExifData } from '@/app/types/exif';

  export default function useExtractExifData(){
    const [ exifData, setExifData ] = useState<ExifData>();
    const extractExifData = (arrayBuffer?:ArrayBuffer)=> {
      if(arrayBuffer){
        const tags = ExifReader.load(arrayBuffer, { expanded: true });
        const imageInfo = {
          date: tags.exif?.DateTime?.description,
          type: tags.Thumbnail?.type,
          device: tags.exif?.Make?.description
        }
        let coordinates;
        if(tags.gps?.Latitude  && tags.gps?.Longitude){
          const { Latitude, Longitude } = tags.gps;
          coordinates = {
            latitude: Latitude,
            longitude: Longitude
          }
        }
        setExifData({ coordinates, imageInfo })
      }
    }

    return { 
      extractExifData,
      exifData
    }
  }