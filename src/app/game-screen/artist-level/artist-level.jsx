import React from "react";
import PropTypes from "prop-types";

import Types from "@types";


const ArtistLevel = (props) => {
  const {question, renderPlayer, onAnswer} = props;

  return <section className="game__screen">
    <h2 className="game__title">Кто исполняет эту песню?</h2>
    <div className="game__track">
      <div className="track">
        {renderPlayer(question.song.src, 0)}
      </div>
    </div>

    <form className="game__artist">
      {question.answers.map((answer, index) => {
        return <div className="artist" key={index}>
          <input
            className="artist__input visually-hidden"
            type="radio"
            name="answer"
            value={answer.artist}
            id={answer.artist}
            onChange={(event) => onAnswer(event.target.value)}
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
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default ArtistLevel;
