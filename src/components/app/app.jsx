import React from "react";
import PropTypes from "prop-types";

import WelcomeScreen from "@components/welcome-screen";


const App = (props) => {
  const {errorLimit} = props;

  return <WelcomeScreen
    errorLimit={errorLimit}
    onWelcomeButtonClick={() => {}}
  />;
};

App.propTypes = {
  errorLimit: PropTypes.number.isRequired,
};

export default App;
