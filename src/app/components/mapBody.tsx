import { TileLayer, Marker, Popup, useMap } from "react-leaflet"
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet'
import { useEffect } from "react";

const defaultIcon = L.icon({
    iconUrl: "/marker-icon.png",
    shadowUrl: iconShadow.src
});

interface Props {
    coordinates: {
        latitude: number,
        longitude: number
    }
}
export default function MapBody({ coordinates }: Props) {
    const { latitude, longitude } = coordinates;
    const map = useMap();
        useEffect(() => {
            map.setView([latitude, longitude], map.getZoom());
        }, [coordinates, map]);
    return (
        <>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} icon={defaultIcon}>
                <Popup>
                    Coordinates. <br /> {latitude}, {longitude}.
                </Popup>
            </Marker>
        </>
    )
}