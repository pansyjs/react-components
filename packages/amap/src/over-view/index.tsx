import InternalOverView from './over-view';
import useOverView from './use-over-view';

type InternalOverViewType = typeof InternalOverView;

interface OverViewInterface extends InternalOverViewType {
  useOverView: typeof useOverView;
}

const OverView = InternalOverView as OverViewInterface;

OverView.useOverView = useOverView;

export default OverView;
