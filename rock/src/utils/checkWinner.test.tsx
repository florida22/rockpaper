import { render, screen } from '@testing-library/react';
import { useReducer, useEffect } from 'react';
import { initialState } from '../context/initialContextValues';
import scoreReducer from '../reducers/scoreReducer';
import { checkWinner } from './checkWinner';

jest.mock('../context/initialContextValues', () => {
  return {
    initialState: {
      playerHand: 2,
      computerHand: 5,
      runTimer: false,
      score: {
        player: 2,
        computer: 1,
      },
      results: {
        winner: 'Player',
        message: 'abc',
      },
    },
  };
});

interface Iprops {
  playerHand: string;
  computerHand: string;
}

const TestingComponent = (props: Iprops) => {
  const [state, dispatch] = useReducer(scoreReducer, initialState);

  useEffect(() => {
    checkWinner(dispatch, props.playerHand, props.computerHand);
  }, []);

  return (
    <>
      <p>playerscore: {state.score.player}</p>
      <p>computerscore: {state.score.computer}</p>
      <p>winner: {state.results.winner}</p>
      <p>message: {state.results.message}</p>
    </>
  );
};

describe('checkwinner', () => {
  it('should update the reducer with the Player wins - Paper beats rock', () => {
    render(<TestingComponent playerHand="paper" computerHand="rock" />);

    expect(screen.getByText(/Player1 wins - Paper beats Rock/i)).toBeInTheDocument();
  });

  it('should update the reducer with the Player wins - Scissors beats paper', () => {
    render(<TestingComponent playerHand="scissors" computerHand="paper" />);

    expect(screen.getByText(/Player1 wins - Scissors beats paper/i)).toBeInTheDocument();
  });

  it('should update the reducer with the Player wins - Scissors beats paper', () => {
    render(<TestingComponent playerHand="scissors" computerHand="paper" />);

    expect(screen.getByText(/Player1 wins - Scissors beats paper/i)).toBeInTheDocument();
    expect(screen.getByText(/playerscore: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/computerscore: 1/i)).toBeInTheDocument();
  });

  it('should update the reducer with the Player wins - Rock beats scissors', () => {
    render(<TestingComponent playerHand="rock" computerHand="scissors" />);

    expect(screen.getByText(/Player wins! Rock beats Scissors/i)).toBeInTheDocument();
    expect(screen.getByText(/playerscore: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/computerscore: 1/i)).toBeInTheDocument();
  });

  it('should update the reducer with the Computer wins - Rock beats scissors', () => {
    render(<TestingComponent playerHand="scissors" computerHand="rock" />);

    expect(screen.getByText(/Computer Wins! - Rock beats scissors!/i)).toBeInTheDocument();
    expect(screen.getByText(/playerscore: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/computerscore: 2/i)).toBeInTheDocument();
  });

  it('should update the reducer with a Draw case - paper paper', () => {
    render(<TestingComponent playerHand="paper" computerHand="paper" />);

    expect(screen.getByText(/We have a Draw/i)).toBeInTheDocument();
    expect(screen.getByText(/playerscore: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/computerscore: 1/i)).toBeInTheDocument();
  });

  it('should update the reducer with a Draw case - rock rock', () => {
    render(<TestingComponent playerHand="rock" computerHand="rock" />);

    expect(screen.getByText(/We have a Draw/i)).toBeInTheDocument();
    expect(screen.getByText(/playerscore: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/computerscore: 1/i)).toBeInTheDocument();
  });
});