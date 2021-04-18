import React, { useState, FunctionComponent } from 'react';
import { Provider } from './context';
import initUnlaunchClient from './initUnlaunchClient';

/**
 * This is an async function which initializes Unlaunch JS SDK 
 * so all flags and the ldClient are ready before the app is rendered.
 * @param config - The configuration used to initialize Unlaunch JS client sdk
 */
export default async function asyncWithUnlaunchProvider(config) {
  
  const { apiKey, flagKeys, options, attributes, identity } = config;
  const { flags, unlaunchClient } = await initUnlaunchClient(apiKey, flagKeys, identity, attributes, options);
  
  const UnlaunchProvider = ({ children }) => {
    const [unlaunchData, setUnlaunchData] = useState({
      flags,
      unlaunchClient,
    });
    return <Provider value={unlaunchData}>{children}</Provider>;
  };

  return UnlaunchProvider;
}