import InternalCircle from './circle';
import useCircle from './use-circle';

type InternalCircleType = typeof InternalCircle;

interface CircleInterface extends InternalCircleType {
  useCircle: typeof useCircle;
}

const Circle = InternalCircle as CircleInterface;

Circle.useCircle = useCircle;

export default Circle;
