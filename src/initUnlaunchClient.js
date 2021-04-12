import  {default as ULClient} from "unlaunch-js-client-lib";
/**
 * Internal function to initialize the `ULClient`.
 */
const initUnlaunchClient = async (
  apiKey,
  flagKeySet,
  identity = 'anonymous',
  attributes = null,
  options={}
) => {
  const unlaunchClient = ULClient.initialize(
    apiKey,
    flagKeySet,
    identity,
    null,
    options
  );
  return new Promise(resolve => {

    unlaunchClient.on('ready', function () {

      let rawFlags = {};

      if (flagKeySet) {
        for (const flag in flagKeySet) {
          rawFlags[flagKeySet[flag]] = unlaunchClient.variation(flagKeySet[flag]);
        }
      }
      const flags = rawFlags;
      resolve({ flags, unlaunchClient });
    });
  });
}

export default initUnlaunchClient;
