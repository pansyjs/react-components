import InternalMap from './map';
import useMap from './use-map';

type InternalMapType = typeof InternalMap;

interface MapInterface extends InternalMapType {
  useMap: typeof useMap;
}

const Map = InternalMap as MapInterface;

Map.useMap = useMap;

export default Map;
