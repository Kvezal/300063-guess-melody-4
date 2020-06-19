import React from "react";
import renderer from "react-test-renderer";
import Enzyme, {shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import PlayButton from "./play-button";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`PlayButtonComponent`, () => {
  test(`should renderer component`, () => {
    const tree = renderer
      .create(
          <PlayButton
            size="small"
            onButtonClick={() => {}}
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test(`should contain button`, () => {
    const playButton = shallow(
        <PlayButton
          size="small"
          onButtonClick={() => {}}
        />
    );
    const button = playButton.find(`button.play-button`);
    expect(button).toHaveLength(1);
  });

  test.each([`small`, `big`])(`should have "size" prop with %p value`, (property) => {
    const playButton = shallow(
        <PlayButton
          size={property}
          onButtonClick={() => {}}
        />
    );
    const button = playButton.find(`button.play-button.play-button--${property}`);
    expect(button).toHaveLength(1);
  });

  test(`shouldn't have size class`, () => {
    const size = `wrong`;
    const playButton = shallow(
        <PlayButton
          size={size}
          onButtonClick={() => {}}
        />
    );
    const button = playButton.find(`button.play-button.play-button--${size}`);
    expect(button).toHaveLength(0);
  });

  test(`should be pressed`, () => {
    const onButtonClickMock = jest.fn();
    const playButton = shallow(
        <PlayButton
          size="small"
          onButtonClick={onButtonClickMock}
        />
    );
    const button = playButton.find(`button.play-button`);
    button.simulate(`click`);
    expect(onButtonClickMock).toHaveBeenCalled();
  });

  test(`should have prop className`, () => {
    const playButton = shallow(
        <PlayButton
          size="small"
          onButtonClick={() => {}}
          className="test"
        />
    );
    const button = playButton.find(`button.play-button.test`);
    expect(button).toHaveLength(1);
  });

  test(`should have content text`, () => {
    const playButtonContent = `content`;
    const playButton = shallow(
        <PlayButton
          size="small"
          onButtonClick={() => {}}
        >
          {playButtonContent}
        </PlayButton>
    );
    const button = playButton.find(`button.play-button`);
    expect(button.text()).toBe(playButtonContent);
  });
});
