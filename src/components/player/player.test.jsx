import React from "react";
import render from "react-test-renderer";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Player from "./player";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`PlayerComponent`, () => {
  it(`should render component`, () => {
    const tree = render.create(<Player />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should contain audio`, () => {
    const player = shallow(<Player />);
    const audio = player.find(`audio`);
    expect(audio).toHaveLength(1);
  });
});
