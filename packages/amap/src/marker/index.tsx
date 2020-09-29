import InternalMarker from './marker';
import useMarker from './use-marker';

type InternalMarkerType = typeof InternalMarker;

interface MarkerInterface extends InternalMarkerType {
  useMarker: typeof useMarker;
}

const Marker = InternalMarker as MarkerInterface;

Marker.useMarker = useMarker;

export default Marker;
