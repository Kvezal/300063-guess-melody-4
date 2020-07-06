import React from "react";
import PropTypes from "prop-types";

import Types from "@types";


const GenreLevel = (props) => {
  const {question, renderPlayer, onAnswer, onAnswerChange, answers} = props;
  return <section className="game__screen">
    <h2 className="game__title">Выберите инди-рок треки</h2>
    <form className="game__tracks" onSubmit={() => onAnswer(answers)}>
      {question.answers.map((answer, index) => {
        return <div className="track" key={index}>
          {renderPlayer(answer.src, index)}
          <div className="game__answer">
            <input
              className="game__input visually-hidden"
              type="checkbox"
              name="answer"
              value={answer.genre}
              id={`${answer.genre}${index}`}
              onChange={(event) => onAnswerChange(event.target.checked, index)}
            />
            <label className="game__check" htmlFor={`${answer.genre}${index}`}>Отметить</label>
          </div>
        </div>;
      })}
      <button className="game__submit button" type="submit">Ответить</button>
    </form>
  </section>;
};

GenreLevel.propTypes = {
  question: PropTypes.shape(Types.genreQuestion).isRequired,
  onAnswer: PropTypes.func.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(
      PropTypes.bool
  ).isRequired,
};

export default GenreLevel;
