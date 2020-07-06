import React from "react";
import {MemoryRouter} from "react-router-dom";
import render from "react-test-renderer";

import GenreLevel from "./genre-level";


describe(`Genre`, () => {
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

  test(`should render component`, () => {
    const tree = render
      .create(
          <MemoryRouter initialEntries={[`/game`]}>
            <GenreLevel
              question={question}
              onAnswer={() => {}}
              onAnswerChange={() => {}}
              answers={question.answers.map(() => false)}
              renderPlayer={() => {}}
            />
          </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

