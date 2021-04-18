import * as React from 'react';
import { Consumer } from './context';
import  {default as ULClient} from "unlaunch-js-client-lib";

/**
 * withUnlaunchConsumer is a function which accepts an optional options object and returns a function
 * which accepts your React component. This function returns a HOC with flags
 * and the unlaunchClient instance injected via props.
 *
 * @param options - If you need only the `unlaunchClient` instance and not flags, then set `{ clientOnly: true }`
 * to only pass the unlaunchClient prop to your component. Defaults to `{ clientOnly: false }`.
 * @return A HOC with flags and the `unlaunchClient` instance injected via props
 */
function withUnlaunchConsumer(options = { clientOnly: false }) {
  return function withUnlaunchConsumerHoc(WrappedComponent) {
    return (props) => (
      <Consumer>
      {({ flags, unlaunchClient }) => {
        if (options.clientOnly) {
          return <WrappedComponent unlaunchClient={unlaunchClient} {...props} />;
        }

        return <WrappedComponent flags={flags} unlaunchClient={unlaunchClient} {...props} />;
      }}
    </Consumer>
    );
  };
}

export default withUnlaunchConsumer;