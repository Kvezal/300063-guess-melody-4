import React from "react";
import PropTypes from "prop-types";

import Types from "@types";


const ArtistLevel = (props) => {
  const {question} = props;

  return <section className="game__screen">
    <h2 className="game__title">Кто исполняет эту песню?</h2>
    <div className="game__track">
      <div className="track">
        <button className="track__button track__button--play" type="button" />
        <div className="track__status">
          <audio />
        </div>
      </div>
    </div>

    <form className="game__artist">
      {question.answers.map((answer) => {
        return <div className="artist" key={answer.artist}>
          <input
            className="artist__input visually-hidden"
            type="radio"
            name="answer"
            value={answer.artist}
            id={answer.artist}
          />
          <label className="artist__name" htmlFor={answer.artist}>
            <img className="artist__picture" src={answer.picture} alt={answer.artist} />
            {answer.artist}
          </label>
        </div>;
      })}
    </form>
  </section>;
};

ArtistLevel.propTypes = {
  question: PropTypes.shape(Types.artistQuestion).isRequired,
};

export default ArtistLevel;
