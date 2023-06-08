import { render, screen } from '@testing-library/react';
import { useEffect, useReducer } from 'react';
// import { describe, it, expect, vi } from 'vitest';

import { initialState } from '../context/initialContextValues';
import scoreReducer from './scoreReducer';
import { ActionTypes, OptionActionKind } from './scoreReducerTypes';

jest.mock('../context/initialContextValues', () => {
  return {
    initialState: {
      playerHand: 2,
      computerHand: 0,
      runTimer: false,
      score: {
        player: 0,
        computer: 0,
      },
      results: {
        winner: '',
        message: '',
      },
    },
  };
});

interface Iprops {
  myaction: ActionTypes;
}

const TestingComponent = (props: Iprops) => {
  const [state, dispatch] = useReducer(scoreReducer, initialState);

  useEffect(() => {
    dispatch(props.myaction);
  }, []);

  return (
    <>
      <p>winner: {state.results.winner}</p>
      <p>winner: {state.results.message}</p>
      <p>playerhand: {state.playerHand}</p>
      <p>computerhand: {state.computerHand}</p>
    </>
  );
};

describe('scoreReducer', () => {
  it('should update the scoreReducer with the correct playerhand', () => {
    render(
      <TestingComponent myaction={{ type: OptionActionKind.UPDATE_PLAYER_CHOICE, payload: 0 }} />
    );

    expect(screen.getByText(/playerhand: 0/)).toBeInTheDocument();
  });

  it('should update the scoreReducer with the correct computerHand', () => {
    render(
      <TestingComponent myaction={{ type: OptionActionKind.UPDATE_COMPUTER_CHOICE, payload: 1 }} />
    );

    expect(screen.getByText(/computerhand: 1/)).toBeInTheDocument();
  });

  it('should update the scoreReducer with the Player wins', () => {
    render(
      <TestingComponent
        myaction={{ type: OptionActionKind.PLAYER_WINS, payload: 'Rock beats scissors' }}
      />
    );

    expect(screen.getByText(/winner: Player/i)).toBeInTheDocument();
    expect(screen.getByText(/Rock beats scissors/i)).toBeInTheDocument();
  });

  it('should update the scoreReducer with the Computer wins', () => {
    render(
      <TestingComponent
        myaction={{ type: OptionActionKind.COMPUTER_WINS, payload: 'Scissors beats paper' }}
      />
    );

    expect(screen.getByText(/winner: Computer/i)).toBeInTheDocument();
    expect(screen.getByText(/Scissors beats paper/i)).toBeInTheDocument();
  });

  it('should update the scoreReducer with the Draw case', () => {
    render(<TestingComponent myaction={{ type: OptionActionKind.DRAW, payload: 'Its a draw' }} />);

    expect(screen.getByText(/winner: No one/i)).toBeInTheDocument();
    expect(screen.getByText(/Its a draw/i)).toBeInTheDocument();
  });

  it('should update the scoreReducer with the Default case', () => {
    render(
      <TestingComponent myaction={{ type: OptionActionKind.RANDOM, payload: 'Its a draw' }} />
    );

    expect(screen.getByText(/winner: Error/i)).toBeInTheDocument();
    expect(screen.getByText(/We have an error/i)).toBeInTheDocument();
  });
});