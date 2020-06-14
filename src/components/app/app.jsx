import React from "react";

import WelcomeScreen from "@components/welcome-screen";
import Models from "@models";


const App = (props) => {
  const {errorLimit} = props;

  return <WelcomeScreen
    errorLimit={errorLimit}
  />;
};

App.propTypes = Models.welcomeScreenModel;

export default App;
