import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Pin from "/images/icon-location.svg";

export const Map = () => {
  const markerIcon = new L.Icon({
    iconUrl: Pin,
    iconSize: [35, 45],
    // require('../public/images/icon-location.svg')
  });

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {/* <Marker position={[45.505, -0.29]} icon={markerIcon}></Marker> */}
      </MapContainer>
    </div>
  );
};
