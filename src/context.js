import { createContext } from 'react';
import  {default as ULClient} from "unlaunch-js-client-lib";

const context = createContext({ flags: {}, unlaunchClient: undefined });

const {Provider,Consumer} = context;

export { Provider, Consumer };
export default context;