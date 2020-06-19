import React from "react";
import renderer from "react-test-renderer";

import WelcomeScreen from "./welcome-screen";


describe(`WelcomeScreen`, () => {
  const errorLimit = 5;

  it(`should render with errorLimit equals ${errorLimit}`, () => {
    const tree = renderer
      .create(
          <WelcomeScreen
            errorLimit={errorLimit}
            onWelcomeButtonClick={() => {}}
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});


