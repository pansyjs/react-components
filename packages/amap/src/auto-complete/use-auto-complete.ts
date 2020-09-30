import { useState, useEffect } from 'react';
import { AutoCompleteProps } from './auto-complete';
import { useEventProperties, useSetProperties } from '../hooks';
import { Keys, AutoCompleteEventMap } from '../types/global';

export interface UseAutoComplete extends AutoCompleteProps {};

const properties: string[] = [
  'type',
  'city',
  'cityLimit'
];

// AMap.Autocomplete.EventMap
const eventNames: Keys<AutoCompleteEventMap>[] = [
  'onComplete',
  'onError',
  'onSelect',
  'onChoose'
]

const useAutoComplete = (props = {} as UseAutoComplete) => {
  const { map, AMap, ...rest } = props;
  const [autoComplete, setAutoComplete] = useState<AMap.Autocomplete>();

  useEffect(() => {
    console.log(props);
    if (map && !autoComplete) {
      let instance: AMap.Autocomplete;
      map.plugin(['AMap.Autocomplete'], () => {
        instance = new AMap.Autocomplete({ ...rest });
        setAutoComplete(instance);
      });
      return () => {
        if (instance) {
          setAutoComplete(undefined);
        }
      }
    }

    return () => {}
  }, []);

  useSetProperties<AMap.Autocomplete, UseAutoComplete>(autoComplete!, props, properties);
  useEventProperties<AMap.Autocomplete, UseAutoComplete>(autoComplete!, props, eventNames);

  return {
    autoComplete, setAutoComplete,
  }
}

export default useAutoComplete;
