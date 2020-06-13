import React from "react";
import PropTypes from "prop-types";

import WelcomePage from "@components/welcome-screen";


const App = (props) => {
  const {errorLimit} = props;

  return <WelcomePage
    errorLimit={errorLimit}
  />;
};

App.propTypes = {
  errorLimit: PropTypes.number.isRequired,
};

export default App;
