import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

// Define your locations with zoom levels
const locations = {
  'Pakuwon Tower': { lat: -7.2610202, lng: 112.7384933, zoom: 18 },
  'Ponorogo': { lat: -7.2998369, lng: 112.7566064, zoom: 18 },
  'East Java': { lat: -6.9074277, lng: 110.9408088, zoom: 7 },
  'Indonesia': { lat: -0.8249566, lng: 114.6713572, zoom: 4 },
};

const Red_MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
  <circle cx="40.7252" cy="40.1992" r="40" fill="#38c206" fill-opacity="0.12"/>
  <circle cx="40.7252" cy="40.2006" r="26.5599" fill="#38c206" fill-opacity="0.24"/>
  <circle cx="40.7252" cy="40.1992" r="17.1367" fill="#38c206"/>
</svg>
  `)}`;

  const BoatIcon = L.icon({
    iconUrl: Red_MARKER,
    iconSize: [40, 40],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
});


const MapView = ({ position, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([position.lat, position.lng], zoom, {
      duration: 1.25, // Duration in seconds
      animate: true,
    });
  }, [position, zoom, map]);

  return null;
};

export default function Domiciline() {
  const [currentLocation, setCurrentLocation] = useState(locations['Ponorogo']); // Default to Ponorogo

  const handleHover = useCallback((location) => {
    setCurrentLocation(locations[location]);
  }, []);

  return (
    <div className='grid grid-cols-1 gap-4'>
      {/* <div className='flex justify-between gap-1'>
        <p className='opacity-70 text-sm'>Domiciline</p>
        <div className='flex gap-1'>
          <span
          className='cursor-pointer hover:text-blue-500'
          onMouseEnter={() => handleHover('Ponorogo')}
          >
          <h2 className='font-bold'>Ponorogo,</h2>
          </span>
          <span
          className='cursor-pointer hover:text-blue-500'
          onMouseEnter={() => handleHover('East Java')}
          >
          <h2 className='font-bold'>East Java,</h2>
          </span>
          <span
          className='cursor-pointer hover:text-blue-500'
          onMouseEnter={() => handleHover('Indonesia')}
          >
          <h2 className='font-bold'>Indonesia</h2>
          </span>
        </div>
    </div> */}
      <div className='bg-stone-50 h-[500px]'>
        <MapContainer
          center={[currentLocation.lat, currentLocation.lng]}
          zoom={currentLocation.zoom}
          style={{ width: '100%', height: '100%', borderRadius: '20px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapView position={{ lat: currentLocation.lat, lng: currentLocation.lng }} zoom={currentLocation.zoom} />
          <Marker position={[currentLocation.lat, currentLocation.lng]} icon={BoatIcon}>
            <Popup>
              {`Lng: ${currentLocation.lng}, Lat: ${currentLocation.lat}`}
            </Popup>
          </Marker>
        </MapContainer>
        {/* <p>Current coordinates: {`Lng: ${currentLocation.lng}, Lat: ${currentLocation.lat}`}</p> */}
      </div>
    </div>
  );
}