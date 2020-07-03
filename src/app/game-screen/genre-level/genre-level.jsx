import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Types from "@types";


class GenreLevel extends PureComponent {
  constructor(props) {
    super(props);
    this._handleAnswerChange = this._handleAnswerChange.bind(this);
    const {question} = props;
    this.state = {
      answers: question.answers.map(() => false),
    };
  }
  render() {
    const {question, renderPlayer, onAnswer} = this.props;
    return <section className="game__screen">
      <h2 className="game__title">Выберите инди-рок треки</h2>
      <form className="game__tracks" onSubmit={() => onAnswer(this.state.answers)}>
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
                onChange={(event) => this._handleAnswerChange(event, index)}
              />
              <label className="game__check" htmlFor={`${answer.genre}${index}`}>Отметить</label>
            </div>
          </div>;
        })}
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>;
  }

  _handleAnswerChange(event, checkboxIndex) {
    const value = event.target.checked;
    const {answers} = this.state;
    const newAnswers = answers.slice();
    newAnswers.splice(checkboxIndex, 1, value);
    this.setState({answers: newAnswers});
  }
}

GenreLevel.propTypes = {
  question: PropTypes.shape(Types.genreQuestion).isRequired,
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default GenreLevel;
