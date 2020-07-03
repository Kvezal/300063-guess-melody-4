import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import GenreLevel from "./genre-level";


const question = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {src: `src/1`, genre: `rock`},
    {src: `src/2`, genre: `blues`},
    {src: `src/3`, genre: `jazz`},
    {src: `src/4`, genre: `rock`}
  ],
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`GenreLevelComponent`, () => {
  test(`should contain form.game__tracks`, () => {
    const genreLevel = shallow(
        <GenreLevel
          question={question}
          onAnswer={() => {}}
          renderPlayer={() => {}}
        />
    );
    const form = genreLevel.find(`form.game__tracks`);
    expect(form).toHaveLength(1);
  });

  test(`should contain tracks`, () => {
    const genreLevel = shallow(
        <GenreLevel
          question={question}
          onAnswer={() => {}}
          renderPlayer={() => {}}
        />
    );
    const tracks = genreLevel.find(`.track`);
    expect(tracks).toHaveLength(question.answers.length);
  });

  test(`all answers prop should be "false" at initialization`, () => {
    const genreLevel = shallow(
        <GenreLevel
          question={question}
          onAnswer={() => {}}
          renderPlayer={() => {}}
        />
    );
    const answers = genreLevel.state().answers;
    expect(answers.some((answer) => answer)).toBeFalsy();
  });

  test(`should call answer`, () => {
    const handleAnswerSubmitMock = jest.fn();
    const genreLevel = mount(
        <GenreLevel
          question={question}
          onAnswer={handleAnswerSubmitMock}
          renderPlayer={() => {}}
        />
    );
    const genreButton = genreLevel.find(`button.game__submit`);
    genreButton.simulate(`submit`);
    expect(handleAnswerSubmitMock).toBeCalled();
  });

  test(`should change answers after checkbox changed`, () => {
    const genreLevel = shallow(
        <GenreLevel
          question={question}
          onAnswer={() => {}}
          renderPlayer={() => {}}
        />
    );
    const checkButtons = genreLevel.find(`input.game__input`);
    const beforeAnswers = genreLevel.state().answers;
    checkButtons.forEach((button) => button.simulate(`change`, {target: {value: true}}));
    const afterAnswers = genreLevel.state().answers;
    const isAllAnswersChanged = beforeAnswers.every((answer, index) => answer !== afterAnswers[index]);
    expect(isAllAnswersChanged).toBeTruthy();
  });

  test(`onAnswer should return true result if answer is corrected`, () => {
    const handleAnswerSubmitMock = jest.fn();
    const preventDefaultMock = jest.fn();
    const genreLevel = shallow(
        <GenreLevel
          question={question}
          onAnswer={handleAnswerSubmitMock}
          renderPlayer={() => {}}
        />
    );
    const checkboxes = genreLevel.find(`input.game__input`);
    checkboxes.at(0).simulate(`change`, {target: {checked: true}});
    checkboxes.at(3).simulate(`change`, {target: {checked: true}});
    const submitButton = genreLevel.find(`form.game__tracks`);
    submitButton.simulate(`submit`, {preventDefault: preventDefaultMock});
    expect(handleAnswerSubmitMock).toHaveBeenCalledWith([true, false, false, true]);
  });

  test(`onAnswer should return false result if answer is wrong`, () => {
    const handleAnswerSubmitMock = jest.fn();
    const preventDefaultMock = jest.fn();
    const genreLevel = shallow(
        <GenreLevel
          question={question}
          onAnswer={handleAnswerSubmitMock}
          renderPlayer={() => {}}
        />
    );
    const checkboxes = genreLevel.find(`input.game__input`);
    checkboxes.at(1).simulate(`change`, {target: {checked: true}});
    const submitButton = genreLevel.find(`form.game__tracks`);
    submitButton.simulate(`submit`, {preventDefault: preventDefaultMock});
    expect(handleAnswerSubmitMock).toHaveBeenCalledWith([false, true, false, false]);
  });
});
