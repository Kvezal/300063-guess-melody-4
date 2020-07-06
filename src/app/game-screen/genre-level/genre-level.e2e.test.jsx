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
          onAnswerChange={() => {}}
          answers={question.answers.map(() => false)}
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
          onAnswerChange={() => {}}
          answers={question.answers.map(() => false)}
          renderPlayer={() => {}}
        />
    );
    const tracks = genreLevel.find(`.track`);
    expect(tracks).toHaveLength(question.answers.length);
  });

  test(`should call answer`, () => {
    const handleAnswerSubmitMock = jest.fn();
    const genreLevel = mount(
        <GenreLevel
          question={question}
          onAnswer={handleAnswerSubmitMock}
          onAnswerChange={() => {}}
          answers={question.answers.map(() => false)}
          renderPlayer={() => {}}
        />
    );
    const genreButton = genreLevel.find(`button.game__submit`);
    genreButton.simulate(`submit`);
    expect(handleAnswerSubmitMock).toBeCalled();
  });
});
