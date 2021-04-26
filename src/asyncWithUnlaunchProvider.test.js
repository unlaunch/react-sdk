
jest.mock('./initUnlaunchClient', () => jest.fn());

import React from 'react';
import { render } from '@testing-library/react';
import initUnlaunchClient from './initUnlaunchClient';
import { Consumer } from './context';
import asyncWithUnlaunchProvider from './asyncWithUnlaunchProvider';
import '@testing-library/jest-dom/extend-expect';

const apiKey = 'apikey';
const identity = 'user_123';
const App = () => <> My App </>;
const mockInitUnlaunchClient = initUnlaunchClient;
const mockFlags = { 'test-flag-1': true, 'test-flag-2': true };
let mockUnlaunchClient;

const renderWithConfig = async (config) => {
  const UnlaunchProvider = await asyncWithUnlaunchProvider(config);

  const { getByText } = render(
    <UnlaunchProvider>
      <Consumer>{value => <span>Received: {JSON.stringify(value.flags)}</span>}</Consumer>
    </UnlaunchProvider>,
  );

  return getByText(/^Received:/);
};

describe('asyncWithUnlaunchProvider', () => {
  beforeEach(() => {
    mockUnlaunchClient = {
      on: jest.fn((e, cb) => {
        cb();
      }),
    };

    mockInitUnlaunchClient.mockImplementation(() => ({
      flags: mockFlags,
      unlaunchClient: mockUnlaunchClient,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('async provider renders app correctly', async () => {
    const UnlaunchProvider = await asyncWithUnlaunchProvider({ apiKey });
    const { container } = render(
      <UnlaunchProvider>
        <App />
      </UnlaunchProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  test('unlaunchClient is initialised correctly', async () => {
    const options = {};
    await asyncWithUnlaunchProvider({ apiKey, flagKeys:undefined, options:{}, attributes:null,identity });

    expect(mockInitUnlaunchClient).toHaveBeenCalledWith(apiKey, undefined, identity, null, {});
  });

  test('unlaunchClient is initialised correctly with target flags', async () => {
    mockInitUnlaunchClient.mockImplementation(() => ({
      flags: { "test-flag-1": true, "test-flag-2": true },
      ldClient: mockUnlaunchClient,
    }));
    const options = {};
    const flagKeys = { 'test-flag-1': false, 'test-flag-2': false };
    const receivedNode = await renderWithConfig({ apiKey, flagKeys, options, attributes:null,identity });

    expect(mockInitUnlaunchClient).toHaveBeenCalledWith(apiKey, flagKeys, identity, null, options);
    expect(receivedNode).toHaveTextContent('{"test-flag-1":true,"test-flag-2":true}');
  });
  test('internal flags state should be initialised to all flags', async () => {
    const options = {} ;
    const receivedNode = await renderWithConfig({ apiKey, identity, options });
    expect(receivedNode).toHaveTextContent('{"test-flag-1":true,"test-flag-2":true}');
  });
});