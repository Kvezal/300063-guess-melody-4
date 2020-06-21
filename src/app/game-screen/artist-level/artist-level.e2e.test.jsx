import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ArtistLevel from "./artist-level";


const question = {
  type: `artist`,
  song: {artist: `Jim Beam`, src: `src`},
  answers: [
    {picture: `picture/1`, artist: `John Snow`},
    {picture: `picture/2`, artist: `Jack Daniels`},
    {picture: `picture/3`, artist: `Jim Beam`}
  ],
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`ArtistLevelComponent`, () => {
  test(`should contain form.game__artist`, () => {
    const tree = mount(
        <ArtistLevel
          question={question}
        />
    );
    const artistLevel = tree.find(`form.game__artist`);
    expect(artistLevel).toHaveLength(1);
  });

  test(`should contain artists`, () => {
    const tree = mount(
        <ArtistLevel
          question={question}
        />
    );
    const artistLevel = tree.find(`.artist`);
    expect(artistLevel).toHaveLength(question.answers.length);
  });
});
