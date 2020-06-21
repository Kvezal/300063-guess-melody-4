import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
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
          onAnswer={() => {}}
        />
    );
    const artistLevel = tree.find(`form.game__artist`);
    expect(artistLevel).toHaveLength(1);
  });

  test(`should contain artists`, () => {
    const tree = mount(
        <ArtistLevel
          question={question}
          onAnswer={() => {}}
        />
    );
    const artistLevel = tree.find(`.artist`);
    expect(artistLevel).toHaveLength(question.answers.length);
  });

  test(`should call answer`, () => {
    const handleAnswerChangeMock = jest.fn();
    const genreLevel = mount(
        <ArtistLevel
          question={question}
          onAnswer={handleAnswerChangeMock}
        />
    );
    const artistInput = genreLevel.find(`input.artist__input`);
    artistInput.at(0).simulate(`change`);
    expect(handleAnswerChangeMock).toBeCalled();
  });

  test(`onAnswer should return true result if answer is corrected`, () => {
    const handleAnswerChangeMock = jest.fn();
    const genreLevel = shallow(
        <ArtistLevel
          question={question}
          onAnswer={handleAnswerChangeMock}
        />
    );
    const artistInput = genreLevel.find(`input.artist__input`);
    artistInput.at(2).simulate(`change`, {target: {value: `Jim Beam`}});
    expect(handleAnswerChangeMock).toHaveBeenCalledWith(true);
  });

  test(`onAnswer should return false result if answer is wrong`, () => {
    const handleAnswerChangeMock = jest.fn();
    const genreLevel = shallow(
        <ArtistLevel
          question={question}
          onAnswer={handleAnswerChangeMock}
        />
    );
    const artistInput = genreLevel.find(`input.artist__input`);
    artistInput.at(0).simulate(`change`, {target: {value: `John Snow`}});
    expect(handleAnswerChangeMock).toHaveBeenCalledWith(false);
  });
});
