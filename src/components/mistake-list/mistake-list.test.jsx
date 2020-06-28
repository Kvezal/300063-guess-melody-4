import React from "react";
import render from "react-test-renderer";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MistakeList from "./mistake-list";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`MistakeListComponent`, () => {
  test(`should render component`, () => {
    const mistakeListSnapshot = render.create(<MistakeList mistakes={3} />).toJSON();
    expect(mistakeListSnapshot).toMatchSnapshot();
  });

  test(`should have game__mistakes container`, () => {
    const tree = shallow(<MistakeList mistakes={0}/>);
    const container = tree.find(`div.game__mistakes`);
    expect(container).toHaveLength(1);
  });

  test.each([1, 2, 3])(`should have %p mistakes`, (mistakes) => {
    const tree = shallow(<MistakeList mistakes={mistakes}/>);
    const mistakeList = tree.find(`div.wrong`);
    expect(mistakeList).toHaveLength(mistakes);
  });
});
