import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";

import WelcomeScreen from "./welcome-screen";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`WelcomeScreenComponent`, () => {
  const errorLimit = 5;

  it(`welcome button should be pressed`, () => {
    const onWelcomeButtonClick = jest.fn();

    const welcomeScreen = mount(
        <MemoryRouter>
          <WelcomeScreen
            errorLimit={errorLimit}
            onWelcomeButtonClick={onWelcomeButtonClick}
          />
        </MemoryRouter>
    );
    const welcomeButton = welcomeScreen.find(`.welcome__button button`);
    welcomeButton.simulate(`click`);
    expect(onWelcomeButtonClick).toHaveBeenCalledTimes(welcomeButton.length);
  });
});
