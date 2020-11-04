import InternalScale from './scale';
import useScale from './use-scale';

type InternalScaleType = typeof InternalScale;

interface ScaleInterface extends InternalScaleType {
  useScale: typeof useScale;
}

const Scale = InternalScale as ScaleInterface;

Scale.useScale = useScale;

export default Scale;
