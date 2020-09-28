import React from 'react';
import APILoader from '../api-loader';
import { Options } from '../api-loader/use-api-loader';
import Map, { MapProps } from './map';
export interface InternalMapProps extends MapProps {
  options?: Options;
  loading?: React.ReactNode;
}

const InternalMap: React.FC<InternalMapProps> = (props) => {
  const { options = {}, loading, ...rest } = props;

  return (
    <APILoader {...options} loading={loading}>
      <Map {...rest} />
    </APILoader>
  )
}

export default InternalMap;
