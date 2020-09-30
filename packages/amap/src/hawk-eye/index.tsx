import InternalHawkEye from './hawk-eye';
import useHawkEye from './use-hawk-eye';

type InternalHawkEye = typeof InternalHawkEye;

interface HawkEyeInterface extends InternalHawkEye {
  useHawkEye: typeof useHawkEye;
}

const HawkEye = InternalHawkEye as HawkEyeInterface;

HawkEye.useHawkEye = useHawkEye;

export default HawkEye;
