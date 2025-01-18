import { Calendar, FileType, MapPin } from "lucide-react"
interface Props {
    imageInfo: {
        date?: string,
        type?: string,
        device?: string
    }
}
export default function ImageInformation({ imageInfo }: Props) {
    return (
        <div className="mt-4 space-y-2 bg-gray-700/50 p-4 rounded-lg">
            {
                imageInfo.date && (
                    <div className="flex items-center text-sm text-gray-300">
                        <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                        <span>Fecha: {imageInfo.date}</span>
                    </div>
                )
            }
            {
                imageInfo.type && (
                    <div className="flex items-center text-sm text-gray-300">
                        <FileType className="w-4 h-4 mr-2 text-pink-400" />
                        <span>Tipo: {imageInfo.type}</span>
                    </div>
                )
            }
            {
                imageInfo.device && (
                    <div className="flex items-center text-sm text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-orange-400" />
                        <span>Dispositivo: { imageInfo.device }</span>
                    </div>
                )
            }
        </div>
    )
}