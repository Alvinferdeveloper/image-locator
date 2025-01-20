import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let defaultIcon = L.icon({
    iconUrl: "/marker-icon.png",
    shadowUrl: iconShadow.src
});

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
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} icon={defaultIcon}>
                <Popup>
                    Coordinates. <br /> { latitude }, { longitude }.
                </Popup>
            </Marker>
        </MapContainer>
    )
}