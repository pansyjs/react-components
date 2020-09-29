import InternalCircle from './circle';
import useCircle from './use-circle';

type InternalAutoCompleteType = typeof InternalCircle;

interface CircleInterface extends InternalAutoCompleteType {
  useCircle: typeof useCircle;
}

const Circle = InternalCircle as CircleInterface;

Circle.useCircle = useCircle;

export default Circle;
