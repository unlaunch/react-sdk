# Unlaunch React SDK

| main                                                                                                                | development                                                                                                                |
|---------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| [![Build Status](https://travis-ci.com/unlaunch/react-sdk.svg?branch=main)](https://travis-ci.com/unlaunch/react-sdk) | [![Build Status](https://travis-ci.com/unlaunch/react-sdk.svg?branch=development)](https://travis-ci.com/unlaunch/react-sdk) |

## Overview
The Unlaunch React SDK provides a React API to access Unlaunch feature flags and other features. Using the SDK, you can
 easily build React applications that can evaluate feature flags, dynamic configurations, and more.

### Important Links

- To create feature flags to use with Java SDK, login to your Unlaunch Console at [https://app.unlaunch.io](https://app.unlaunch.io)
- [Official Guide](https://docs.unlaunch.io/docs/sdks/react-sdk)

### Compatibility
Unlaunch React SDK requires React 16.3.0 or higher.

## Getting Started
Here is a simple example. 

First, add the npm dependency to your project.

```$xslt
 npm install --save unlaunch-react-sdk
```
Here's how you'd use the React SDK in your application.

1. asyncWithUnlaunchProvider

```js
import { asyncWithUnlaunchProvider } from 'unlaunch-react-sdk';

(async () => {
  const unLaunchProvider = await asyncWithUnlaunchProvider({
    flag : ['flag-1','flag-1'] // Flag key set
    apiKey : '<PROVIDE_BROWSER_PUBLIC_KEY_FOR_YOUR_PROJECT>'
    identity : 'anonymous' // Use special anonymous identity which generates a unique UUID
    options = {
       offline: false,         
       requestTimeoutInMillis: 1000,
       logLevel: 'debug'  
    });

    render(
      <UnlaunchProvider>
        <YourApp />
      </UnlaunchProvider>,
      document.getElementById('reactDiv'),
    );
})();
   }
}
```

2. withUnlaunchProvider

```js
import { withUnlaunchProvider } from 'unlaunch-react-sdk';

export default withUnlaunchProvider({
  flag : ['flag-1','flag-1'] // Flag key set
  apiKey : '<PROVIDE_BROWSER_PUBLIC_KEY_FOR_YOUR_PROJECT>'
  identity : 'anonymous' // Use special anonymous identity which generates a unique UUID
  options: { /* ... */ }
})(YourApp);
```

 For more information, see the [official guide](https://docs.unlaunch.io/docs/sdks/react-sdk).

## License
Licensed under the Apache License, Version 2.0. See: [Apache License](LICENSE.md).

## About Unlaunch
Unlaunch is a Feature Release Platform for engineering teams. Our mission is allow engineering teams of all
 sizes to release features safely and quickly to delight their customers. To learn more about Unlaunch, please visit
  [www.unlaunch.io](https://unlaunch.io). You can sign up to get started for free at [https://app.unlaunch.io/signup
  ](https://app.unlaunch.io/signup).

## More Questions?
At Unlaunch, we are obsessed about making it easier for developers all over the world to release features safely and with confidence. If you have *any* questions or something isn't working as expected, please email **unlaunch@gmail.com**.
