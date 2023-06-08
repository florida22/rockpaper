export enum OptionActionKind {
  UPDATE_PLAYER_CHOICE = 'UPDATE_PLAYER_CHOICE',
  UPDATE_COMPUTER_CHOICE = 'UPDATE_COMPUTER_CHOICE',
  RUN_TIMER = 'RUN_TIMER',
  DRAW = 'DRAW',
  COMPUTER_WINS = 'COMPUTER_WINS',
  PLAYER_WINS = 'PLAYER_WINS',
}

interface UpdatePlayerChoice {
  type: OptionActionKind.UPDATE_PLAYER_CHOICE;
  payload: number;
}

interface UpdateComputerChoice {
  type: OptionActionKind.UPDATE_COMPUTER_CHOICE;
  payload: number;
}

interface RunTimer {
  type: OptionActionKind.RUN_TIMER;
  payload: boolean;
}

interface Draw {
  type: OptionActionKind.DRAW;
  payload: string;
}

interface PlayerWins {
  type: OptionActionKind.PLAYER_WINS;
  payload: string;
}

interface ComputerWins {
  type: OptionActionKind.COMPUTER_WINS;
  payload: string;
}

export type ActionTypes =
  | UpdatePlayerChoice
  | UpdateComputerChoice
  | RunTimer
  | Draw
  | PlayerWins
  | ComputerWins;