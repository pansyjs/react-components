import InternalInfoWindow from './info-window';
import useInfoWindow from './use-info-window';

type InternalInfoWindowType = typeof InternalInfoWindow;

interface InfoWindowInterface extends InternalInfoWindowType {
  useInfoWindow: typeof useInfoWindow;
}

const InfoWindow = InternalInfoWindow as InfoWindowInterface;

InfoWindow.useInfoWindow = useInfoWindow;

export default InfoWindow;
