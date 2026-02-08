import { useReducer } from "react";

export type PlayerScores = Map<string, number | null>;

export enum PlayerScoresActionType {
  ADD_PLAYER, REMOVE_PLAYER, SET_PLAYER_SCORE
}

export type PlayerScoresActions =
  { type: PlayerScoresActionType.ADD_PLAYER, name: string }
  | { type: PlayerScoresActionType.REMOVE_PLAYER, name: string }
  | { type: PlayerScoresActionType.SET_PLAYER_SCORE, name: string, score: number }

function reducer(state: PlayerScores, action: PlayerScoresActions): PlayerScores {
  switch (action.type) {
    case PlayerScoresActionType.ADD_PLAYER:
      if (state.has(action.name)) {
        throw Error("There is already a player with this name");
      }
      state.set(action.name, null);
      return state;
    case PlayerScoresActionType.REMOVE_PLAYER:
      state.delete(action.name);
      return state;
    case PlayerScoresActionType.SET_PLAYER_SCORE:
      state.set(action.name, action.score);
      return state;
  }
}

export function usePlayerScores() {
  return useReducer(reducer, new Map<string, number>());
}
