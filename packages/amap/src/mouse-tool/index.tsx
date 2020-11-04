import InternalMouseTool from './mouse-tool';
import useMouseTool from './use-mouse-tool';

type InternalMouseToolType = typeof InternalMouseTool;

interface MouseToolInterface extends InternalMouseToolType {
  useMouseTool: typeof useMouseTool;
}

const MouseTool = InternalMouseTool as MouseToolInterface;

MouseTool.useMouseTool = useMouseTool;

export default MouseTool;
