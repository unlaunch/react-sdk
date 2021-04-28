jest.mock('./initUnlaunchClient', () => jest.fn());
jest.mock('./context', () => ({ Provider: 'Provider' }));

import * as React from 'react';
import { create } from 'react-test-renderer';
import initUnlaunchClient from './initUnlaunchClient';
import withUnlaunchProvider from './withUnlaunchProvider';
import UnlaunchProvider from './provider';

const apiKey = 'apiKey';
const App = () => <div>My App</div>;
const mockInitUnlaunchClient = initUnlaunchClient;
const mockFlags = { "test-flag-1": true, "test-flag-2": true };
const mockUnlaunchClient = {
  on: jest.fn((e, cb) => {
    cb();
  }),
};

describe('withUnlaunchProvider', () => {
  beforeEach(() => {
    mockInitUnlaunchClient.mockImplementation(() => ({
      flags: mockFlags,
      unlaunchClient: mockUnlaunchClient,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('render app', () => {
    const UnlaunchApp = withUnlaunchProvider({ apiKey })(App);
    const component = create(<UnlaunchApp />);
    expect(component).toMatchSnapshot();
  });

  test('unlaunch client is initialized correctly', async () => {
    const identity = "user-123";
    const options = {};
    const UnlaunchApp = withUnlaunchProvider({ apiKey, flagKeys:undefined, options:{}, attributes:null,identity  })(App);
    const instance = create(<UnlaunchApp />).root.findByType(UnlaunchProvider).instance;

    await instance.componentDidMount();
    expect(mockInitUnlaunchClient).toHaveBeenCalledWith(apiKey, undefined, identity, null, {});
  });

  test('unlaunch client is initialized correctly with target flags', async () => {
    mockInitUnlaunchClient.mockImplementation(() => ({
      flags: { "test-flag-1": true, "test-flag-2": true },
      unlaunchClient: mockUnlaunchClient,
    }));
    const identity = "user-123";
    const options = {};
    const flagKeys = { 'test-flag-1': false, 'test-flag-2': false };
    const UnlaunchApp = withUnlaunchProvider({apiKey, flagKeys, options, attributes:null,identity })(App);
    const instance = create(<UnlaunchApp />).root.findByType(UnlaunchProvider).instance;
    instance.setState = jest.fn();

    await instance.componentDidMount();

    expect(mockInitUnlaunchClient).toHaveBeenCalledWith(apiKey, flagKeys, identity, null, {});
    expect(instance.setState).toHaveBeenCalledWith({
      flags: { "test-flag-1": true, "test-flag-2": true },
      unlaunchClient: mockUnlaunchClient,
    });
  });

  test('flags and unlaunchClient are saved in state on mount', async () => {
    const flagKeys = { 'test-flag-1': false, 'test-flag-2': false };
    const identity = "user-123";
    const UnlaunchApp = withUnlaunchProvider({ apiKey, flagKeys, options:{}, attributes:null,identity })(App);
    const instance = create(<UnlaunchApp />).root.findByType(UnlaunchProvider).instance;
    instance.setState = jest.fn();

    await instance.componentDidMount();
    expect(instance.setState).toHaveBeenCalledWith({ flags: mockFlags, unlaunchClient: mockUnlaunchClient });
  });
})