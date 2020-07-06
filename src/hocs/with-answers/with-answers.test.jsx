import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withAnswer from "./with-answers";


const TestComponent = (props) => {
  const {answers, onAnswerChange} = props;
  return <Fragment>
    {answers.map((answer, index) =>
      <div
        key={index}
        onClick={(event) => onAnswerChange(event.target.checked, index)}
      />
    )}
  </Fragment>;
};

TestComponent.propTypes = {
  answers: PropTypes.arrayOf(
      PropTypes.bool
  ).isRequired,
  onAnswerChange: PropTypes.func.isRequired,
};

const TestComponentWithHOC = withAnswer(TestComponent);

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`withAnswers`, () => {
  const question = {
    type: `genre`,
    genre: `rock`,
    answers: [
      {src: ``, genre: `rock`},
      {src: ``, genre: `pop`},
      {src: ``, genre: `jazz`},
      {src: ``, genre: `rap`}
    ],
  };

  test(`should have answers prop`, () => {
    const testComponent = shallow(<TestComponentWithHOC question={question}/>);
    const answers = testComponent.props().answers;
    expect(answers).toEqual(question.answers.map(() => false));
  });

  test(`should change answer`, () => {
    const testComponent = shallow(<TestComponentWithHOC question={question}/>);
    const divs = testComponent.find(`div`);
    divs.forEach((div, index) => {
      div.simulate(`click`);
      const answers = testComponent.props().answers;
      expect(answers.at(index)).toBeTruthy();
    });
  });
});
