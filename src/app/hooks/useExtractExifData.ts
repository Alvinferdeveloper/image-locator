import ExifReader from 'exifreader';
import { useState } from 'react';

type ExifData = {
  coordinates?: {
    latitude: number,
    longitude: number
  }
}
  export default function useExtractExifData(){
    const [ exifData, setExifData ] = useState<ExifData>();
    const extractExifData = (arrayBuffer?:ArrayBuffer)=> {
      if(arrayBuffer){
        const tags = ExifReader.load(arrayBuffer, { expanded: true });
        if(tags.gps?.Latitude  && tags.gps?.Longitude){
          const { Latitude, Longitude } = tags.gps;
          const coordinates = {
            latitude: Latitude,
            longitude: Longitude
          }
          setExifData({ coordinates });
        }
      }
    }

    return { 
      extractExifData,
      exifData
    }
  }