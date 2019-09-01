import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

/**
 *
 * Loader
 *
 */
const LoaderScreen = () => {
  return (
    <Dimmer active inverted>
      <Loader size="large">Loading</Loader>
    </Dimmer>
  );
};

export default LoaderScreen;
