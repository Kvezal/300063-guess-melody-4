import React from "react";
import render from "react-test-renderer";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Audio from "./audio";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`AudioComponent`, () => {
  test(`should render component`, () => {
    const tree = render.create(<Audio onPlayAudioClick={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test(`should call onPlayAudioClick`, () => {
    const onPlayAudioClickMock = jest.fn();
    const audio = mount(<Audio onPlayAudioClick={onPlayAudioClickMock} />);
    const playButton = audio.find(`button`);
    playButton.simulate(`click`);
    expect(onPlayAudioClickMock).toHaveBeenCalled();
  });
});
