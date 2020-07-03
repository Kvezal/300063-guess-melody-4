import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {App} from "./app";


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

describe(`AppComponent`, () => {
  test(`should have welcome screen`, () => {
    const app = mount(
        <App
          errorLimit={3}
          questions={questions}
          screen="welcome"
        />
    );
    const welcomeScreen = app.find(`section.welcome`);
    expect(welcomeScreen).toHaveLength(1);
  });
});
