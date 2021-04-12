import * as React from 'react';
import UnlaunchProvider from './provider';

/**
 * `withUnlaunchProvider` is a function which accepts a config object which is used to
 * initialize `unlaunch-js-client-sdk`
 */
export function withUnlaunchProvider(config) {
  return function withUnlaunchProviderHoc(WrappedComponent) {

    return class extends React.Component{
      render() {
        return (
          <UnlaunchProvider {...config}>
            <WrappedComponent {...this.props} />
          </UnlaunchProvider>
        );
      }
    };
  };
}

export default withUnlaunchProvider;