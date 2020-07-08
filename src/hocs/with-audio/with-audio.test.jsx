import React from "react";
import PropTypes from "prop-types";
import render from "react-test-renderer";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withAudio from "./with-audio";


const TestComponent = (props) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

TestComponent.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`withAudioHOC`, () => {
  test(`should render component`, () => {
    const TestComponentWithHOC = withAudio(TestComponent);
    const tree = render
      .create(
          <TestComponentWithHOC
            source=""
            isPlaying={false}
            onPlayButtonClick={() => {}}
          />,
          {createNodeMock: () => ({})}
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test(`should have audio`, () => {
    const TestComponentWithHOC = withAudio(TestComponent);
    const wrapper = mount(
        <TestComponentWithHOC
          source=""
          isPlaying={false}
          onPlayButtonClick={() => {}}
        />
    );
    const audio = wrapper.find(`audio`);
    expect(audio).toHaveLength(1);
  });
});
