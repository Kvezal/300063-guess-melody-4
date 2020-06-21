import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Result from "./result";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`ResultComponent`, () => {
  test(`should have result section`, () => {
    const resultComponent = shallow(<Result type="success" rightAnswers={0} mistakes={0} />);
    const result = resultComponent.find(`section.result`);
    expect(result).toHaveLength(1);
  });

  test(`should have a failed title if user lost game`, () => {
    const resultComponent = shallow(<Result type="failed" rightAnswers={0} mistakes={0} />);
    const result = resultComponent.find(`p.result__total--fail`);
    expect(result).toHaveLength(1);
  });

  test(`should have a success title if user won game`, () => {
    const resultComponent = shallow(<Result type="success" rightAnswers={0} mistakes={0} />);
    const failedResult = resultComponent.find(`p.result__total--fail`);
    const successResult = resultComponent.find(`p.result__total`);
    expect(failedResult).toHaveLength(0);
    expect(successResult).toHaveLength(1);
  });

  test(`should have right answers count`, () => {
    const rightAnswers = 10;
    const resultComponent = shallow(<Result type="success" rightAnswers={rightAnswers} mistakes={0} />);
    const result = resultComponent.find(`p.result__total`);
    expect(result.text().includes(rightAnswers)).toBeTruthy();
  });

  test(`should have right mistakes count`, () => {
    const mistakes = 2;
    const resultComponent = shallow(<Result type="success" rightAnswers={8} mistakes={mistakes} />);
    const result = resultComponent.find(`p.result__total`);
    expect(result.text().includes(mistakes)).toBeTruthy();
  });
});
