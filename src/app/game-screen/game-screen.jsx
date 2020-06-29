import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import Types from "@types";
import {GameScreenTypes, GameLevels} from "@enums";
import MistakeList from "@components/mistake-list";
import GenreLevel from "@app/game-screen/genre-level";
import ArtistLevel from "@app/game-screen/artist-level";
import FailedResult from "@app/game-screen/failed-result";
import SuccessResult from "@app/game-screen/success-result";
import withActivePlayer from "@hocs/with-active-player";

const GenreLevelWrapper = withActivePlayer(GenreLevel);
const ArtistLevelWrapper = withActivePlayer(ArtistLevel);


class GameScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screen: GameScreenTypes.GAME,
      level: 0,
      mistakes: 0,
      answers: 0,
    };
    this._handleAnswerClick = this._handleAnswerClick.bind(this);

    this._chooseGameScreen = this._chooseGameScreen.bind(this);
    this._chooseSuccessResultScreen = this._chooseSuccessResultScreen.bind(this);
    this._chooseFailedResultScreen = this._chooseFailedResultScreen.bind(this);
    this._screenMap = new Map([
      [GameScreenTypes.SUCCESS, () => this._chooseSuccessResultScreen()],
      [GameScreenTypes.FAILED, () => this._chooseFailedResultScreen()],
      [GameScreenTypes.GAME, this._chooseGameScreen],
    ]);

    this._chooseArtistLevel = this._chooseArtistLevel.bind(this);
    this._chooseGenreLevel = this._chooseGenreLevel.bind(this);
    this._levelMap = new Map([
      [GameLevels.ARTIST, this._chooseArtistLevel],
      [GameLevels.GENRE, this._chooseGenreLevel]
    ]);
  }

  render() {
    const {screen} = this.state;
    return this._screenMap.get(screen)();
  }

  _chooseSuccessResultScreen() {
    const {answers, mistakes} = this.state;
    return <SuccessResult
      rightAnswers={answers}
      mistakes={mistakes}
    />;
  }

  _chooseFailedResultScreen() {
    return <FailedResult/>;
  }

  _chooseGameScreen() {
    const {questions} = this.props;
    const {level, mistakes} = this.state;
    const question = questions[level];
    return <section className={`game game--${question.type}`}>
      <header className="game__header">
        <Link className="game__back" to="/">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" />
        </svg>
        <MistakeList mistakes={mistakes} />
      </header>
      {this._levelMap.get(question.type)(question)}
    </section>;
  }

  _chooseArtistLevel(question) {
    return <ArtistLevelWrapper
      question={question}
      onAnswer={this._handleAnswerClick}
    />;
  }

  _chooseGenreLevel(question) {
    return <GenreLevelWrapper
      question={question}
      onAnswer={this._handleAnswerClick}
    />;
  }

  _handleAnswerClick(isRightAnswer) {
    let {level, answers, mistakes, screen} = this.state;
    const {errorLimit, questions} = this.props;
    ++level;
    if (!isRightAnswer) {
      ++mistakes;
    } else {
      ++answers;
    }
    if (mistakes >= errorLimit) {
      screen = GameScreenTypes.FAILED;
    }
    if (level >= questions.length) {
      screen = GameScreenTypes.SUCCESS;
    }
    this.setState({
      screen,
      level,
      answers,
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
  questions: PropTypes.arrayOf(Types.question).isRequired,
  time: PropTypes.number.isRequired,
};

export default GameScreen;
