import React from "react";

import WelcomePage from "@components/welcome-screen";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {errorLimit} = props;

  return <WelcomePage
    errorLimit={errorLimit}
  />;
};

export default App;
