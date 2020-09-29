import InternalInfoWindow from './info-window';
import useInfoWindow from './use-info-window';

type InternalMarkerType = typeof InternalInfoWindow;

interface MarkerInterface extends InternalMarkerType {
  useInfoWindow: typeof useInfoWindow;
}

const InfoWindow = InternalInfoWindow as MarkerInterface;

InfoWindow.useInfoWindow = useInfoWindow;

export default InfoWindow;
