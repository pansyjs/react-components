import InternalAutoComplete from './auto-complete';
import useAutoComplete from './use-auto-complete';

type InternalAutoCompleteType = typeof InternalAutoComplete;

interface MarkerInterface extends InternalAutoCompleteType {
  useAutoComplete: typeof useAutoComplete;
}

const AutoComplete = InternalAutoComplete as MarkerInterface;

AutoComplete.useAutoComplete = useAutoComplete;

export default AutoComplete;
