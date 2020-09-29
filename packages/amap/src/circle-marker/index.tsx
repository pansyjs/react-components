import InternalCircleMarker from './circle-marker';
import useCircleMarker from './use-circle-marker';

type InternalCircleMarkerType = typeof InternalCircleMarker;

interface CircleMarkerInterface extends InternalCircleMarkerType {
  useCircleMarker: typeof useCircleMarker;
}

const CircleMarker = InternalCircleMarker as CircleMarkerInterface;

CircleMarker.useCircleMarker = useCircleMarker;

export default CircleMarker;
