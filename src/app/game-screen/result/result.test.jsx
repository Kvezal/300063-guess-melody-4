import React from "react";
import render from "react-test-renderer";

import Result from "./result";


describe(`Result`, () => {
  test(`should render success component`, () => {
    const tree = render
      .create(
          <Result type="success" rightAnswers={10} mistakes={0}/>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test(`should render failed component`, () => {
    const tree = render
      .create(
          <Result type="failed" rightAnswers={0} mistakes={0}/>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

