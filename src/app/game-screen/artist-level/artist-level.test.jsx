import React from "react";
import render from "react-test-renderer";

import ArtistLevel from "./artist-level";


describe(`ArtistLevel`, () => {
  const question = {
    type: `artist`,
    song: {artist: `Jim Beam`, src: `src`},
    answers: [
      {picture: `picture/1`, artist: `John Snow`},
      {picture: `picture/2`, artist: `Jack Daniels`},
      {picture: `picture/3`, artist: `Jim Beam`}
    ],
  };

  test(`should render component`, () => {
    const tree = render
      .create(
          <ArtistLevel
            question={question}
            onAnswer={() => {}}
            renderPlayer={() => {}}
          />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
