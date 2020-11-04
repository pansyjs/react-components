import InternalToolBar from './tool-bar';
import useToolBar from './use-tool-bar';

type InternalToolBar = typeof InternalToolBar;

interface ToolBarInterface extends InternalToolBar {
  useToolBar: typeof useToolBar;
}

const ToolBar = InternalToolBar as ToolBarInterface;

ToolBar.useToolBar = useToolBar;

export default ToolBar;
