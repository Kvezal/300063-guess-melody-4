import React from "react";
import render from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";

import {GameScreen} from "./game-screen";


describe(`GameScreen`, () => {
  test(`should render component`, () => {
    const questions = [{
      type: `artist`,
      song: {artist: `Jim Beam`, src: `src`},
      answers: [
        {picture: `picture/1`, artist: `John Snow`},
        {picture: `picture/2`, artist: `Jack Daniels`},
        {picture: `picture/3`, artist: `Jim Beam`}
      ],
    }];
    const tree = render
      .create(
          <MemoryRouter>
            <GameScreen
              questions={questions}
              level={0}
              mistakes={0}
              screen="game"
              onUserAnswer={() => {}}
              onResetGame={() => {}}
            />
          </MemoryRouter>, {
            createNodeMock: () => ({}),
          }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test(`should render component`, () => {
    const questions = [{
      type: `genre`,
      genre: `rock`,
      answers: [
        {src: `src/1`, genre: `rock`},
        {src: `src/2`, genre: `blues`},
        {src: `src/3`, genre: `jazz`},
        {src: `src/4`, genre: `rock`}
      ],
    }];
    const tree = render
      .create(
          <MemoryRouter>
            <GameScreen
              questions={questions}
              level={0}
              mistakes={0}
              screen="game"
              onUserAnswer={() => {}}
              onResetGame={() => {}}
            />
          </MemoryRouter>, {
            createNodeMock: () => ({}),
          }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
