import React from 'react';
import useApiLoader, { Options } from './use-api-loader';

export interface APILoaderProps extends Options {
  loading?: React.ReactNode;
}

const APILoader: React.FC<APILoaderProps> = ({
  loading,
  children,
  ...rest
}) => {
  const { loaded } = useApiLoader(rest);


  if (!loaded) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        {loading}
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </div>
  );
}

export default APILoader;
