import React from "react";

import WelcomeScreen from "@components/welcome-screen";
import Models from "@models";


const App = (props) => {
  const {errorLimit, onWelcomeButtonClick} = props;

  return <WelcomeScreen
    errorLimit={errorLimit}
    onWelcomeButtonClick={onWelcomeButtonClick}
  />;
};

App.propTypes = Models.welcomeScreenModel;

export default App;
