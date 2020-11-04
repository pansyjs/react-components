import InternalControlBar from './control-bar';
import useControlBar from './use-control-bar';

type InternalControlBar = typeof InternalControlBar;

interface ControlBarInterface extends InternalControlBar {
  useControlBar: typeof useControlBar;
}

const ControlBar = InternalControlBar as ControlBarInterface;

ControlBar.useControlBar = useControlBar;

export default ControlBar;
