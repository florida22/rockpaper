// import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { OptionsProvider } from '../context/optionsContext';
import ScoreAndResults from './ScoreAndResults';
import ChooseAndPlay from './ChooseAndPlay';
import { generateComputerHand } from '../utils/randomNumber';

jest.mock('../utils/randomNumber', () => ({
  generateComputerHand: () => 0,
}));

jest.mock('./ScoreAndResults.module.css', () => {
  return {
    default: {
      winnerAnimation: 'winnerAnimation',
    },
  };
});

describe('ScoreAndResults', () => {
  it('should display 2 seconds on the screen after we wait 1 second second', () => {
    jest.useFakeTimers();

    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    );

    const hand = screen.getByText(/paper/i);
    expect(hand).toBeInTheDocument();

    fireEvent.click(hand);
    fireEvent.click(screen.getByText('Play'));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    screen.debug();

    expect(screen.getByTestId('timer')).toHaveTextContent('2');
  });

  it('should display 2 seconds on the screen after we wait 1 second second (2)', () => {
    jest.useFakeTimers();

    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    );

    const hand = screen.getByText(/paper/i);
    expect(hand).toBeInTheDocument();

    fireEvent.click(hand);
    fireEvent.click(screen.getByText('Play'));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    screen.debug();

    expect(screen.getByTestId('timer')).toHaveTextContent('1');
  });

  it('should display the Player winner message on the page', () => {
    jest.useFakeTimers();

    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    );

    const hand = screen.getByText(/paper/i);
    expect(hand).toBeInTheDocument();

    fireEvent.click(hand);
    fireEvent.click(screen.getByText('Play'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    screen.debug();

    expect(screen.getByText(/Player wins!/i)).toBeInTheDocument();
    expect(screen.getByText(/Player1 wins - Paper beats Rock/i)).toBeInTheDocument();

    expect(screen.getByText(/Player: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Computer: 0/i)).toBeInTheDocument();

    expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible();
    expect(screen.getAllByTestId(/paper/i)[0]).toBeVisible();

    expect(screen.getAllByTestId(/rock/i)).toHaveLength(2);
  });

  it('should display the Computer winner message on the page', () => {
    jest.useFakeTimers();

    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    );

    const hand = screen.getByText(/scissors/i);
    expect(hand).toBeInTheDocument();

    fireEvent.click(hand);
    fireEvent.click(screen.getByText('Play'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    screen.debug();

    expect(screen.getAllByText(/Computer wins!/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Computer Wins! - Rock beats scissors!/i)).toBeInTheDocument();

    expect(screen.getByText(/Player: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Computer: 1/i)).toBeInTheDocument();

    expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible();
    expect(screen.getAllByTestId(/scissors/i)[0]).toBeVisible();

    expect(screen.getAllByTestId(/rock/i)).toHaveLength(2);
  });

  it('should display the Draw message on the page', () => {
    jest.useFakeTimers();

    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    );

    const hand = screen.getByText(/rock/i);
    expect(hand).toBeInTheDocument();

    fireEvent.click(hand);
    fireEvent.click(screen.getByText('Play'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    screen.debug();

    expect(screen.getByText(/No one/i)).toBeInTheDocument();
    expect(screen.getByText(/We have a draw/i)).toBeInTheDocument();

    expect(screen.getByText(/Player: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Computer: 0/i)).toBeInTheDocument();

    expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible();
    expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible();

    expect(screen.getAllByTestId(/rock/i)).toHaveLength(3);
  });

  it('should display the player and computer hand shake when playing', () => {
    jest.useFakeTimers();

    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    );

    const playerHandShake = screen.queryByTestId('playerShake');
    const computerHandShake = screen.queryByTestId('computerShake');

    expect(playerHandShake).not.toBeInTheDocument();

    expect(computerHandShake).not.toBeInTheDocument();

    const hand = screen.getByText(/rock/i);

    fireEvent.click(hand);
    fireEvent.click(screen.getByText('Play'));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    screen.debug();

    expect(screen.queryByTestId('playerShake')).toBeInTheDocument();
    expect(screen.queryByTestId('computerShake')).toBeInTheDocument();
  });

  it('should display the Player winner animation', () => {
    jest.useFakeTimers();

    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    );

    const hand = screen.getByText(/paper/i);

    fireEvent.click(hand);
    fireEvent.click(screen.getByText('Play'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('playerResult')).toHaveClass('winnerAnimation');

    screen.debug();
  });

  it('should display the Computer winner animation', () => {
    jest.useFakeTimers();

    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    );

    const hand = screen.getByText(/scissors/i);

    fireEvent.click(hand);
    fireEvent.click(screen.getByText('Play'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('computerResult')).toHaveClass('winnerAnimation');
  });

  it('should reset the previous winner message results', () => {
    jest.useFakeTimers();

    render(
      <OptionsProvider>
        <ScoreAndResults />
        <ChooseAndPlay />
      </OptionsProvider>
    );

    const hand = screen.getByText(/scissors/i);

    fireEvent.click(hand);
    fireEvent.click(screen.getByText('Play'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('computerResult')).toHaveClass('winnerAnimation');
    expect(screen.getAllByText(/Computer wins!/i)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId(/rock/i)[0]).toBeVisible();
    expect(screen.getAllByTestId(/rock/i)).toHaveLength(2);

    fireEvent.click(screen.getByText(/paper/i));

    screen.debug();
    expect(screen.getByTestId('computerResult')).not.toHaveClass('winnerAnimation');
    expect(screen.queryByText(/Computer wins!/i)).toBeNull();
    expect(screen.getAllByTestId(/rock/i)).toHaveLength(1);
  });
});