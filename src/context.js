import { createContext } from 'react';

const context = createContext({ flags: {}, unlaunchClient: undefined });

const {Provider,Consumer} = context;
export { Provider, Consumer };
export default context;