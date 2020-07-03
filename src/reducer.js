import {extend} from "@utils";
import {GameLevels, GameScreenTypes} from "@enums";
import questions from "@mocks/questions";


const initialState = {
  mistakes: 0,
  errorLimit: 3,
  level: 0,
  questions,
  screen: null,
};

const ActionType = {
  INCREMENT_MISTAKE: `INCREMENT_MISTAKE`,
  INCREMENT_LEVEL: `INCREMENT_LEVEL`,
  RESET_GAME: `RESET_GAME`,
  CHOOSE_SCREEN: `CHOOSE_SCREEN`,
};

const checkArtistAnswer = (question, userAnswer) => {
  return question.song.artist === userAnswer;
};

const checkGenreAnswer = (question, userAnswers) => {
  return userAnswers.every((userAnswer, index) => {
    const isRightGenre = question.answers[index].genre === question.genre;
    return userAnswer === isRightGenre;
  });
};

const getCurrentGameScreen = (state) => {
  const {questions: questionList, level, mistakes, errorLimit} = state;
  let screen = GameScreenTypes.GAME;
  if (mistakes >= errorLimit) {
    screen = GameScreenTypes.FAILED;
  } else if (level >= questionList.length) {
    screen = GameScreenTypes.SUCCESS;
  }
  return screen;
};

const ActionCreator = {
  incrementMistake: (question, userAnswer) => {
    let isCorrectAnswer = false;

    switch (question.type) {
      case GameLevels.ARTIST:
        isCorrectAnswer = checkArtistAnswer(question, userAnswer);
        break;
      case GameLevels.GENRE:
        isCorrectAnswer = checkGenreAnswer(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKE,
      payload: isCorrectAnswer ? 0 : 1,
    };
  },

  incrementLevel: () => ({
    type: ActionType.INCREMENT_LEVEL,
    payload: 1,
  }),

  resetGame: () => ({
    type: ActionType.RESET_GAME,
    payload: null,
  }),

  chooseScreen: () => ({
    type: ActionType.CHOOSE_SCREEN,
    payload: null,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_LEVEL:
      return extend(state, {
        level: state.level + action.payload,
      });
    case ActionType.INCREASE_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });
    case ActionType.RESET_GAME:
      return extend(state, {
        level: 0,
        mistakes: 0,
      });
    case ActionType.CHOOSE_SCREEN:
      return extend(state, {
        screen: getCurrentGameScreen(state),
      });
  }
  return state;
};

export {
  ActionType,
  ActionCreator,
  reducer,
};
