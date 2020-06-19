import React from "react";
import ReactDOM from "react-dom";

import App from "@app";
import questions from "@mocks/questions";


const root = document.querySelector(`#root`);

ReactDOM.render(
    <App
      errorLimit={3}
      questions={questions}
    />,
    root
);
