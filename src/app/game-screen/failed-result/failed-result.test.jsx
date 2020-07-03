import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import render from "react-test-renderer";

import FailedResult from "./failed-result";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`FailedResultComponent`, () => {
  test(`should render failed component`, () => {
    const tree = render
      .create(<FailedResult onResetLinkClick={() => {}}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test(`should have a failed title`, () => {
    const resultComponent = shallow(<FailedResult onResetLinkClick={() => {}}/>);
    const result = resultComponent.find(`p.result__total--fail`);
    expect(result).toHaveLength(1);
  });
});
