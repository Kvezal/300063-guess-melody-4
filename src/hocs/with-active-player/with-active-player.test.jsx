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

  test(`should change active player id`, () => {
    const pauseStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `pause`)
      .mockImplementation(() => {});
    const testComponent = mount(<TestComponentWithHOC/>);

    const beforeActivePlayer = testComponent.state().activePlayerId;
    const renderPlayer = testComponent.find(`button`);
    renderPlayer.simulate(`click`);
    const afterActivePlayer = testComponent.state().activePlayerId;
    expect(beforeActivePlayer === afterActivePlayer).toBeFalsy();
    expect(pauseStub).toHaveBeenCalled();
  });
});
