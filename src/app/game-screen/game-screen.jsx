import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import Types from "@types";
import {GameScreenTypes, GameLevels} from "@enums";
import MistakeList from "@components/mistake-list";
import GenreLevel from "@app/game-screen/genre-level";
import ArtistLevel from "@app/game-screen/artist-level";
import FailedResult from "@app/game-screen/failed-result";
import SuccessResult from "@app/game-screen/success-result";
import withActivePlayer from "@hocs/with-active-player";

import {ActionCreator} from "../../reducer";

const GenreLevelWrapper = withActivePlayer(GenreLevel);
const ArtistLevelWrapper = withActivePlayer(ArtistLevel);


class GameScreen extends PureComponent {
  constructor(props) {
    super(props);

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
    const {screen} = this.props;
    return this._screenMap.get(screen)();
  }

  _chooseSuccessResultScreen() {
    const {level, mistakes, onResetGame} = this.props;
    return <SuccessResult
      rightAnswers={level - mistakes}
      mistakes={mistakes}
      onResetLinkClick={onResetGame}
    />;
  }

  _chooseFailedResultScreen() {
    const {onResetGame} = this.props;
    return <FailedResult onResetLinkClick={onResetGame}/>;
  }

  _chooseGameScreen() {
    const {questions, level, mistakes} = this.props;
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
    const {onUserAnswer} = this.props;
    return <ArtistLevelWrapper
      question={question}
      onAnswer={(answer) => onUserAnswer(question, answer)}
    />;
  }

  _chooseGenreLevel(question) {
    const {onUserAnswer} = this.props;
    return <GenreLevelWrapper
      question={question}
      onAnswer={(answers) => onUserAnswer(question, answers)}
    />;
  }
}

GameScreen.propTypes = {
  questions: PropTypes.arrayOf(Types.question).isRequired,
  level: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  screen: PropTypes.string.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onResetGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
  level: state.level,
  mistakes: state.mistakes,
  screen: state.screen,
});

const mapDispatchToProps = (dispatch) => ({
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementLevel());
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.chooseScreen());
  },

  onResetGame() {
    dispatch(ActionCreator.resetGame());
    dispatch(ActionCreator.chooseScreen());
  }
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
