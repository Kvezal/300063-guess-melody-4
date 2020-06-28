import React from "react";
import ReactDOM from "react-dom";

import App from "@app";
import Enums from "@enums";
import questions from "@mocks/questions";


const root = document.querySelector(`#root`);

ReactDOM.render(
    <App
      errorLimit={3}
      questions={questions}
      screen={Enums.ScreenTypes.WELCOME}
    />,
    root
);
