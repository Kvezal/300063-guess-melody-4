import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import GameScreen from "./game-screen";


const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {src: `src/1`, genre: `rock`},
      {src: `src/2`, genre: `blues`},
      {src: `src/3`, genre: `jazz`},
      {src: `src/4`, genre: `rock`}
    ],
  }, {
    type: `artist`,
    song: {artist: `Jim Beam`, src: `src`},
    answers: [
      {picture: `picture/1`, artist: `John Snow`},
      {picture: `picture/2`, artist: `Jack Daniels`},
      {picture: `picture/3`, artist: `Jim Beam`}
    ],
  }
];

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`GameScreenComponent`, () => {
  test(`should choose genre level`, () => {
    const genreQuestions = questions.filter((question) => question.type === `genre`);
    const tree = shallow(
        <GameScreen
          questions={genreQuestions}
        />
    );
    const artistLevel = tree.find(`section.game--genre`);
    expect(artistLevel).toHaveLength(1);
  });

  test(`should choose artist level`, () => {
    const artistQuestions = questions.filter((question) => question.type === `artist`);
    const tree = shallow(
        <GameScreen
          questions={artistQuestions}
          level={1}
        />
    );
    const artistLevel = tree.find(`section.game--artist`);
    expect(artistLevel).toHaveLength(1);
  });
});
