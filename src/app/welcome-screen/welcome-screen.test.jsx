import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";

import WelcomeScreen from "./welcome-screen";


describe(`WelcomeScreen`, () => {
  const errorLimit = 5;

  it(`should render with errorLimit equals ${errorLimit}`, () => {
    const tree = renderer
      .create(
          <MemoryRouter>
            <WelcomeScreen
              errorLimit={errorLimit}
              onWelcomeButtonClick={() => {}}
            />
          </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});


