import React from "react";

import WelcomePage from "@components/welcome-screen";
import Models from "@models";


const App = (props) => {
  const {errorLimit} = props;

  return <WelcomePage
    errorLimit={errorLimit}
  />;
};

App.propTypes = Models.welcomePageModel;

export default App;
