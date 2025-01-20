import { MapContainer } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import MapBody from "./mapBody";


interface Props {
    coordinates: {
        latitude: number,
        longitude: number
    }
}
export default function Map({ coordinates }: Props) {
    const { latitude, longitude } = coordinates;
    return (
        <MapContainer center={[latitude, longitude]} zoom={13} className=" w-full h-screen">
           <MapBody coordinates={coordinates}/>
        </MapContainer>
    )
}