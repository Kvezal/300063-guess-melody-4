import React from "react";
import PropTypes from "prop-types";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withActiveFlag from "./with-active-flag";


Enzyme.configure({
  adapter: new Adapter(),
});

const TestComponent = (props) => {
  const {onActiveChange} = props;
  return <button
    onClick={onActiveChange}
  />;
};

TestComponent.propTypes = {
  onActiveChange: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const TestComponentWithHOC = withActiveFlag(TestComponent);

describe(`withActiveFlag`, () => {
  test(`isActive should be false`, () => {
    const testComponent = shallow(<TestComponentWithHOC/>);
    const isActiveFlag = testComponent.state().isActive;
    expect(isActiveFlag).toBeFalsy();
  });

  test(`isActive should be true`, () => {
    const testComponent = shallow(
        <TestComponentWithHOC
          isActive={true}
        />
    );
    const isActiveFlag = testComponent.state().isActive;
    expect(isActiveFlag).toBeTruthy();
  });

  test(`should change isActive state`, () => {
    const baseIsActiveFlag = true;
    const testComponent = mount(
        <TestComponentWithHOC
          isActive={baseIsActiveFlag}
        />
    );
    const button = testComponent.find(`button`);
    button.simulate(`click`);
    const isActiveFlag = testComponent.state().isActive;
    expect(isActiveFlag !== baseIsActiveFlag).toBeTruthy();
  });
});
