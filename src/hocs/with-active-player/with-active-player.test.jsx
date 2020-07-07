import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withAudioPlayer from "./with-active-player";


const TestComponent = (props) => {
  const {renderPlayer} = props;
  return <div>
    {renderPlayer(`test-source`, 0)}
  </div>;
};

TestComponent.propTypes = {
  renderPlayer: PropTypes.func.isRequired,
};

const TestComponentWithHOC = withAudioPlayer(TestComponent);

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`withActivePlayerHOC`, () => {
  test(`should add renderPlayer prop`, () => {
    const testComponent = mount(<TestComponentWithHOC/>);
    const renderPlayer = testComponent.find(`audio`);
    expect(renderPlayer).toHaveLength(1);
  });
});
