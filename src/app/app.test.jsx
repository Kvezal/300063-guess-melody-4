import React from "react";
import renderer from "react-test-renderer";

import App from "./app";


describe(`App`, () => {
  const errorLimit = 4;

  it(`should render with errorLimit equals ${errorLimit}`, () => {
    const tree = renderer
      .create(
          <App
            errorLimit={errorLimit}
            questions={[]}
            screen="welcome"
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
