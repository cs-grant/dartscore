import { useCallback, useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import SetupContext from "@/contexts/SetupContext";
import { PlayerScoresActionType } from "@/hooks/usePlayerScores";
import { dartboardGreen, dartboardRed } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import PlayerSelector from "@/components/PlayerSelector";

export default function Index() {
  const textColor = useThemeColor({}, 'text');
  const textDisabledColor = useThemeColor({}, 'textDisabled');
  const backgroundColor = useThemeColor({}, 'background');
  const backgroundTintColor = useThemeColor({}, 'backgroundTint');
  const setup = useContext(SetupContext);
  const [input, setInput] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>(setup.playerScores.keys().next().value as string);

  const total = setup.playerScores.get(playerName) ?? setup.initial;

  const setTotal = useCallback((newValue: number) => {
    setup.dispatchPlayerScores({
      type: PlayerScoresActionType.SET_PLAYER_SCORE,
      name: playerName,
      score: newValue,
    })
  }, [playerName]);

  const onSubmit = useCallback((multiplier: number) => {
    return () => {
      if (input) {
        const newTotal = total - (parseInt(input) * multiplier);
        if (newTotal < 0) {
          alert('Too high! Your turn has ended.');
        }
        if (newTotal === 0) {
          // Declare winner
          alert("You have won!");
        }
        setTotal(newTotal);
        setInput("");
      }
    }
  }, [input]);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backgroundColor,
          gap: 32
        }}
      >
        <ThemedText style={styles.bigNumber}>
          {total}
        </ThemedText>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText>
            Enter a throw
          </ThemedText>
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: backgroundTintColor,
              color: textColor
            }}
            value={input}
            onChangeText={setInput}
            keyboardType="numeric"
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 16
          }}
        >
          <Button
            title="Single"
            onPress={onSubmit(1)}
            color={dartboardGreen}
          />
          <Button
            title="Double"
            onPress={onSubmit(2)}
            color={dartboardGreen}
          />
          <Button
            title="Triple"
            onPress={onSubmit(3)}
            color={dartboardGreen}
          />
        </View>
      </View>
      <PlayerSelector activePlayer={playerName} setActivePlayer={setPlayerName}></PlayerSelector>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 72,
    width: 144,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 56,
  },
  greenBackground: {
    backgroundColor: dartboardGreen,
  },
  redBackground: {
    backgroundColor: dartboardRed,
  },
  bigNumber: {
    fontSize: 72,
    margin: 16
  },
});
