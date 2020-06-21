import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Types from "@types";
import Enums from "@enums/index";
import GenreLevel from "@app/game-screen/genre-level/genre-level";
import ArtistLevel from "@app/game-screen/artist-level/artist-level";
import MistakeList from "@components/mistakes";


class GameScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      level: 0,
      mistakes: 0,
      answers: 0,
    };
    this._handleAnswerClick = this._handleAnswerClick.bind(this);

    this._chooseArtistLevel = this._chooseArtistLevel.bind(this);
    this._chooseGenreLevel = this._chooseGenreLevel.bind(this);
    this._levelMap = new Map([
      [Enums.GameLevels.ARTIST, this._chooseArtistLevel],
      [Enums.GameLevels.GENRE, this._chooseGenreLevel]
    ]);
  }

  render() {
    const {questions} = this.props;
    const {level, mistakes} = this.state;
    const question = questions[level];
    return <section className={`game game--${question.type}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>
        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" />
        </svg>
        <MistakeList mistakes={mistakes} />
      </header>
      {this._levelMap.get(question.type)(question)}
    </section>;
  }

  _chooseArtistLevel(question) {
    return <ArtistLevel
      question={question}
      onAnswer={this._handleAnswerClick}
    />;
  }

  _chooseGenreLevel(question) {
    return <GenreLevel
      question={question}
      onAnswer={this._handleAnswerClick}
    />;
  }

  _handleAnswerClick(isRightAnswer) {
    let {level, answers, mistakes} = this.state;
    const {errorLimit} = this.props;
    ++level;
    if (!isRightAnswer) {
      ++mistakes;
    }
    if (mistakes >= errorLimit) {
      // Game over! Results should show here
    }
    this.setState({
      level,
      answers: ++answers,
      mistakes,
    });
  }
}

GameScreen.defaultProps = {
  errorLimit: 3,
  time: 300,
};

GameScreen.propTypes = {
  errorLimit: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(Types.question),
  time: PropTypes.number.isRequired,
};

export default GameScreen;
