import { PlayerScores, PlayerScoresActions } from "@/hooks/usePlayerScores";
import { Context, createContext } from "react";

export interface Setup {
  initial: number;
  setInitial: (newState: number) => void;
  playerScores: PlayerScores;
  dispatchPlayerScores: (action: PlayerScoresActions) => void;
}

const SetupContext: Context<Setup> = createContext<Setup>({
  initial: 0,
  setInitial: () => {},
  playerScores: new Map<string, number>(),
  dispatchPlayerScores: () => {},
});

export default SetupContext;
