import React from "react";
import render from "react-test-renderer";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SuccessResult from "./success-result";


Enzyme.configure({
  adapter: new Adapter(),
});


describe(`SuccessResultComponent`, () => {
  test(`should render success component`, () => {
    const tree = render
      .create(
          <SuccessResult
            rightAnswers={10}
            mistakes={0}
            onResetLinkClick={() => {}}
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test(`should have a success title`, () => {
    const resultComponent = mount(
        <SuccessResult
          rightAnswers={0}
          mistakes={0}
          onResetLinkClick={() => {}}
        />
    );
    const failedResult = resultComponent.find(`p.result__total--fail`);
    const successResult = resultComponent.find(`p.result__total`);
    expect(failedResult).toHaveLength(0);
    expect(successResult).toHaveLength(1);
  });

  test(`should have right answers count`, () => {
    const rightAnswers = 10;
    const resultComponent = mount(
        <SuccessResult
          rightAnswers={rightAnswers}
          mistakes={0}
          onResetLinkClick={() => {}}
        />
    );
    const result = resultComponent.find(`p.result__total`);
    expect(result.text().includes(rightAnswers)).toBeTruthy();
  });

  test(`should have right mistakes count`, () => {
    const mistakes = 2;
    const resultComponent = mount(
        <SuccessResult
          rightAnswers={8}
          mistakes={mistakes}
          onResetLinkClick={() => {}}
        />
    );
    const result = resultComponent.find(`p.result__total`);
    expect(result.text().includes(mistakes)).toBeTruthy();
  });
});
