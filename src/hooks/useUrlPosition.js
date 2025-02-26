import { useSearchParams } from 'react-router-dom'

export function useUrlPosition() {
    const [searchParams] = useSearchParams();
    const mapLat = searchParams.get("lat") || 40
    const mapLng = searchParams.get("lng") || 0


    return { mapLat, mapLng }
}