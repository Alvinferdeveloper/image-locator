export type ExifData = {
    coordinates?: {
      latitude: number,
      longitude: number
    }
    imageInfo: {
      date?: string,
      type?: string,
      device?: string
    }
  
  }