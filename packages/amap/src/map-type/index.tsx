import InternalMapType from './map-type';
import useMapType from './use-map-type';

type InternalMapType = typeof InternalMapType;

interface MapTypeInterface extends InternalMapType {
  useMapType: typeof useMapType;
}

const MapType = InternalMapType as MapTypeInterface;

MapType.useMapType = useMapType;

export default MapType;
