import * as React from 'react';
import { ULClient } from 'unlaunch-js-client-lib';
import { Provider } from './context';
import initUnlaunchClient from './initUnlaunchClient';

class UnlaunchProvider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      flags: {},
      unlaunchClient: undefined,
    };
  }


  initULClient = async () => {
    const { apiKey, flagKeys, options, attributes, identity } = this.props;
    const { flags, unlaunchClient } = await initUnlaunchClient(apiKey, flagKeys, identity, attributes, options);
    this.setState({ 
      flags, 
      unlaunchClient
    });
    // this.subscribeToChanges(ldClient);
  };

  async componentDidMount() {
    const { identity } = this.props;
    if (!identity) {
      return;
    }

    await this.initULClient();
  }

  async componentDidUpdate(prevProps) {
    const { identity } = this.props;
    const userJustLoaded = !prevProps.identity && identity;
    if (userJustLoaded) {
      await this.initULClient();
    }
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export default UnlaunchProvider;