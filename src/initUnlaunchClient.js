import * as ULClient from "unlaunch-js-client-lib";

/**
 * Internal function to initialize the `UnlaunchClient`.
 *
 * @param apiKey Your project and environment specific client side ID
 * @param flagKeySet Flag Keys for evaluation
 * @param identity User unique id 
 * @param attributes Unlaunch attributes for evaluation (Optional)
 * @param options Unlaunch initialization options
 *
 * @return An initialized client and flags
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
    attributes,
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