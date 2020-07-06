import React, {Fragment, memo} from "react";
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
import withAnswers from "@hocs/with-answers";
import withActivePlayer from "@hocs/with-active-player";

import {ActionCreator} from "../../reducer";

const GenreLevelWrapper = withAnswers(withActivePlayer(GenreLevel));
const ArtistLevelWrapper = withActivePlayer(ArtistLevel);

const chooseGameLevel = (question, onUserAnswer) => {
  switch (question.type) {
    case GameLevels.ARTIST:
      return <ArtistLevelWrapper
        question={question}
        onAnswer={(answer) => onUserAnswer(question, answer)}
      />;
    case GameLevels.GENRE:
      return <GenreLevelWrapper
        question={question}
        onAnswer={(answers) => onUserAnswer(question, answers)}
      />;
    default:
      return <Fragment/>;
  }
};

const GameScreen = (props) => {
  const {screen, onResetGame, level, mistakes, questions, onUserAnswer} = props;

  switch (screen) {
    case GameScreenTypes.SUCCESS:
      return <SuccessResult
        rightAnswers={level - mistakes}
        mistakes={mistakes}
        onResetLinkClick={onResetGame}
      />;

    case GameScreenTypes.FAILED:
      return <FailedResult onResetLinkClick={onResetGame}/>;

    case GameScreenTypes.GAME:
      const question = questions[level];
      return <section className={`game game--${question.type}`}>
        <header className="game__header">
          <Link
            className="game__back"
            to="/"
            onClick={onResetGame}
          >
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"/>
          </svg>
          <MistakeList mistakes={mistakes}/>
        </header>
        {chooseGameLevel(question, onUserAnswer)}
      </section>;

    default:
      return <Fragment/>;
  }
};

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
export default connect(mapStateToProps, mapDispatchToProps)(memo(GameScreen));
