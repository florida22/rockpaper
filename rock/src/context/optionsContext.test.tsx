// import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useOptions, OptionsProvider } from './optionsContext';

jest.mock('./initialContextValues', () => {
  return {
    initialState: {
      playerHand: 1,
      computerHand: 2,
      runTimer: false,
      score: {
        player: 0,
        computer: 0,
      },
      results: {
        winner: 'Player 1',
        message: '',
      },
    },
  };
});

const TestingComponent = () => {
  const optionsContext = useOptions();
  return (
    <>
      <p>Playerhand: {optionsContext.state.playerHand}</p>
      <p>ComputerHand: {optionsContext.state.computerHand}</p>
      <p>Winner: {optionsContext.state.results.winner}</p>
    </>
  );
};

describe('OptionsContext', () => {
  it('should render the component with the context initial values', () => {
    render(
      <OptionsProvider>
        <TestingComponent />
      </OptionsProvider>
    );

    expect(screen.getByText(/Playerhand: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Computerhand: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Winner: Player 1/i)).toBeInTheDocument();
  });
});