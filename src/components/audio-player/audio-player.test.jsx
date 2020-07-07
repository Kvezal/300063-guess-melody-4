import React from "react";
import render from "react-test-renderer";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import AudioPlayer from "./audio-player";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`AudioPlayerComponent`, () => {
  const source = `test-source`;

  test(`should render component`, () => {
    const tree = render
      .create(
          <AudioPlayer
            isLoading={true}
            source={source}
            isPlaying={false}
            onPlayButtonClick={() => {}}
          />, {
            createNodeMock: () => ({}),
          }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test(`button state should be "play"`, () => {
    const audioComponent = mount(
        <AudioPlayer
          isLoading={true}
          source={source}
          isPlaying={false}
          onPlayButtonClick={() => {}}
        />
    );
    const button = audioComponent.find(`.track__button--play`);
    expect(button).toHaveLength(1);
  });

  test(`button state should be "pause"`, () => {
    const audioComponent = mount(
        <AudioPlayer
          isLoading={true}
          source={source}
          isPlaying={true}
          onPlayButtonClick={() => {}}
        />
    );
    const button = audioComponent.find(`.track__button--pause`);
    expect(button).toHaveLength(1);
  });
});
