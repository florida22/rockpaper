import { useEffect, useState } from 'react';
import { useOptions } from '../context/optionsContext';
import { OptionActionKind } from '../reducers/scoreReducerTypes';
import { checkWinner } from '../utils/checkWinner';
import styles from './ScoreAndResults.module.css';

const ScoreAndResults = () => {
  const [timer, setTimer] = useState<number>(3);

  const optionsContext = useOptions();
  const { runTimer } = optionsContext.state;
  const { dispatch, options } = optionsContext;

  const playerHandIndex = optionsContext.state.playerHand;
  const playerHandName = optionsContext.options[playerHandIndex].name;
  const playerHandIcon = optionsContext.options[playerHandIndex].icon;
  const playerScore = optionsContext.state.score.player;

  const computerHandIndex = optionsContext.state.computerHand;
  const computerHandName = optionsContext.options[computerHandIndex].name;
  const computerHandIcon = optionsContext.options[computerHandIndex].icon;
  const computerScore = optionsContext.state.score.computer;

  const { winner, message } = optionsContext.state.results;

  useEffect(() => {
    if (runTimer) {
      const newInterValId = setInterval(() => {
        setTimer((prevCount) => {
          if (prevCount === 1) {
            clearInterval(newInterValId);
          }

          return prevCount - 1;
        });
      }, 1000);
    }
  }, [runTimer]);

  useEffect(() => {
    if (timer === 0) {
      setTimer(3);
      dispatch({ type: OptionActionKind.RUN_TIMER, payload: false });
      checkWinner(dispatch, playerHandName, computerHandName);
    }
  }, [timer, computerHandName,playerHandName, dispatch ]);

  return (
    <>
      <div className={styles.scoreCtn}>
        <div className={styles.score}>
          <h3>Score</h3>
          <p>Player: {playerScore}</p>
        </div>
        <div className={styles.score}>
          <h3>Score</h3>
          <p>Computer: {computerScore}</p>
        </div>
      </div>
      <div className={styles.results}>
        <div
          data-testid="playerResult"
          className={`${styles.playerHand} ${winner === 'Player' ? styles.winnerAnimation : ''}`}
        >
          {runTimer && (
            <div data-testid="playerShake" className={styles.playerShake}>
              {options[0].icon}
            </div>
          )}
          {!runTimer && winner && (
            <>
              <div>{playerHandIcon}</div>
              <p>{playerHandName}</p>
            </>
          )}
        </div>
        <div className={styles.midCol}>
          {runTimer && (
            <p data-testid="timer" className={styles.timer}>
              {timer}
            </p>
          )}
          {!runTimer && winner && <p className={styles.resultWinner}>{winner} wins!</p>}
          {!runTimer && winner && <p className={styles.resultMessage}>{message}</p>}
        </div>
        <div
          data-testid="computerResult"
          className={`${styles.computerHand} ${
            winner === 'Computer' ? styles.winnerAnimation : ''
          }`}
        >
          {runTimer && (
            <div data-testid="computerShake" className={styles.computerShake}>
              {options[0].icon}
            </div>
          )}
          {!runTimer && winner && (
            <>
              <div>{computerHandIcon}</div>
              <p>{computerHandName}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ScoreAndResults;