import InternalPolygon from './polygon';
import usePolygon from './use-polygon';

type InternalPolygonType = typeof InternalPolygon;

interface PolygonInterface extends InternalPolygonType {
  usePolygon: typeof usePolygon;
}

const Polygon = InternalPolygon as PolygonInterface;

Polygon.usePolygon = usePolygon;

export default Polygon;
