import * as React from 'react';
import UnlaunchProvider from './provider';

/**
 * `withUnlaunchProvider` is a function which accepts a config object which is used to
 * initialize `unlaunch-js-client-sdk`.
 *
 * This HOC handles passing configuration to the `UnlaunchProvider`, which does the following:
 * - It initializes the unlaunchClient instance by calling `unlaunch-js-client-sdk` initialize on `componentDidMount`
 * - It saves all flags and the ldClient instance in the context API
 *
 * @param config - The configuration used to initialize Unlaunch's JS SDK
 * @return A function which accepts your root React component and returns a HOC
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