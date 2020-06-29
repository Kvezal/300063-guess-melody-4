import React from "react";
import render from "react-test-renderer";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Result from "./result";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`ResultComponent`, () => {
  test(`should render component`, () => {
    const tree = render
      .create(<Result>Test</Result>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test(`should have result section`, () => {
    const resultComponent = shallow(<Result>Test</Result>);
    const result = resultComponent.find(`section.result`);
    expect(result).toHaveLength(1);
  });
});

