import React from "react";
import ReactDOM from "react-dom";

import App from "@components/app";


const root = document.querySelector(`#root`);

const onWelcomeButtonClick = () => {};

ReactDOM.render(
    <App
      errorLimit={3}
      onWelcomeButtonClick={onWelcomeButtonClick}
    />,
    root
);
