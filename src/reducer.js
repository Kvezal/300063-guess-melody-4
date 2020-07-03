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
  INCREASE_MISTAKES: `INCREASE_MISTAKES`,
  INCREMENT_LEVEL: `INCREMENT_LEVEL`,
  RESET_GAME: `RESET_GAME`,
  CHOOSE_SCREEN: `CHOOSE_SCREEN`,
};

const getArtistAnswerMistakes = (question, userAnswer) => {
  return question.song.artist === userAnswer;
};

const getGenreAnswerMistakes = (question, userAnswers) => {
  return userAnswers.reduce((mistakes, userAnswer, index) => {
    const isRightGenre = question.answers[index].genre === question.genre;
    if (userAnswer !== isRightGenre) {
      mistakes++;
    }
    return mistakes;
  }, 0);
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

const gameAnswerMistakesCounterMap = new Map([
  [GameLevels.ARTIST, getArtistAnswerMistakes],
  [GameLevels.GENRE, getGenreAnswerMistakes]
]);

const ActionCreator = {
  increaseMistakes: (question, userAnswer) => {
    let mistakes = 0;

    const checkAnswer = gameAnswerMistakesCounterMap.get(question.type);
    if (checkAnswer) {
      mistakes = checkAnswer(question, userAnswer);
    }

    return {
      type: ActionType.INCREASE_MISTAKES,
      payload: mistakes,
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
