import React from "react";
import renderer from "react-test-renderer";

import App from "./app";


describe(`App component`, () => {
  const errorLimit = 4;

  it(`should render with errorLimit equals ${errorLimit}`, () => {
    const tree = renderer
      .create(<App errorLimit={errorLimit} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
