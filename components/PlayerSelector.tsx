import SetupContext from "@/contexts/SetupContext";
import React, { useCallback, useContext } from "react";
import { Pressable, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedText } from "../components/ThemedText";

interface PlayerSelectorProps {
  activePlayer: string
  setActivePlayer: (newPlayer: string) => void
}

export default function PlayerSelector({ activePlayer, setActivePlayer }: PlayerSelectorProps) {
  const textColor = useThemeColor({}, 'text');
  const textDisabledColor = useThemeColor({}, 'textDisabled');
  const backgroundColor = useThemeColor({}, 'background');

  const players: Array<string> = useContext(SetupContext).playerScores.keys().toArray();
  const playerIndex = players.indexOf(activePlayer);
  const isFirst = playerIndex === 0;
  const isLast = playerIndex === players.length - 1;

  const previous = useCallback(() => {
    setActivePlayer(players.at(playerIndex - 1) ?? activePlayer);
  }, [activePlayer]);

  const next = useCallback(() => {
    setActivePlayer(players.at(isLast ? 0 : playerIndex + 1) ?? activePlayer);
  }, [activePlayer]);

  return (
    <View style={{
      bottom: 0,
      left: 0,
      right: 0,
      height: 48,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: backgroundColor
    }}>
      <Pressable onPress={previous}>
        <ThemedText type="subtitle">{isFirst ? "<<" : "<"}</ThemedText>
      </Pressable>
      <ThemedText type="subtitle">{activePlayer}</ThemedText>
      <Pressable onPress={next}>
        <ThemedText type="subtitle">{isLast ? ">>" : ">"}</ThemedText>
      </Pressable>
    </View>
  )
}