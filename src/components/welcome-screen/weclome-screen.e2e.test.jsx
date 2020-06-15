import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import WelcomeScreen from "./welcome-screen";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`WelcomeScreenComponent`, () => {
  const errorLimit = 5;

  it(`welcome button should be pressed`, () => {
    const onWelcomeButtonClick = jest.fn();

    const welcomeScreen = shallow(
        <WelcomeScreen
          errorLimit={errorLimit}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
    );
    const welcomeButton = welcomeScreen.find(`button.welcome__button`);
    welcomeButton.simulate(`click`);
    expect(onWelcomeButtonClick).toHaveBeenCalledTimes(welcomeButton.length);
  });
});
