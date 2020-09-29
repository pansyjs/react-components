import InternalRectangle from './rectangle';
import useRectangle from './use-rectangle';

type InternalRectangleType = typeof InternalRectangle;

interface RectangleInterface extends InternalRectangleType {
  useRectangle: typeof useRectangle;
}

const Rectangle = InternalRectangle as RectangleInterface;

Rectangle.useRectangle = useRectangle;

export default Rectangle;
