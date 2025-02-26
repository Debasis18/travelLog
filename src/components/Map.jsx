import { useNavigate } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesCOntext';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0])
    const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeolocation()
    const { mapLat, mapLng } = useUrlPosition();

    // Updating map position when it is recived from usrl i.e user click a city
    useEffect(function () {
        if (mapLat && mapLng)
            setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    // updating map position when user click any map postion ,loaction is catch by using custom hook
    useEffect(function () {
        if (geoLocationPosition) {
            setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
        }
    }, [geoLocationPosition])




    return (
        <div className={styles.mapContainer} >
            {!geoLocationPosition && <Button type="position" onClick={getPosition}>
                {isLoadingPosition ? "Loading" : "Use your position"}
            </Button>}
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* This is marker not center */}
                {cities.map((city) => <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                    <Popup>
                        <span>{city.emoji}</span>
                        <span>{city.cityName}</span>
                    </Popup>
                </Marker>)}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>

        </div>
    )
}

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate()
    useMapEvents({

        click: (e) => {
            console.log(e)
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}

export default Map