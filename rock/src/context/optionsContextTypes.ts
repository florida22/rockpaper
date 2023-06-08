import React from 'react';
import { ActionTypes } from '../reducers/scoreReducerTypes';

export enum HandOption {
  rock = 'rock',
  paper = 'paper',
  scissors = 'scissors',
}

export interface IOptions {
  name: HandOption;
  icon: JSX.Element;
}

export interface IoptionsContext {
  options: IOptions[];
  state: IInitialState;
  dispatch: React.Dispatch<ActionTypes>;
}

export interface Props {
  children: React.ReactNode;
}

interface IResults {
  winner: string;
  message: string;
}

interface IScore {
  player: number;
  computer: number;
}

export interface IInitialState {
  playerHand: number;
  computerHand: number;
  runTimer: boolean;
  score: IScore;
  results: IResults;
}