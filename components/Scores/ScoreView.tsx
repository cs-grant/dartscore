import { useCallback, useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import SetupContext from "@/contexts/SetupContext";
import { PlayerScoresActionType } from "@/hooks/usePlayerScores";
import { dartboardGreen, dartboardRed, dartboardWhite } from "@/constants/Colors";

export default function ScoresView() {
  const setup = useContext(SetupContext);
  const [input, setInput] = useState<string>();
  const playerName = 'Grant';

  const total = setup.playerScores.get(playerName) ?? setup.initial;
  
  const setTotal = useCallback((newValue: number) => {
    setup.dispatchPlayerScores({
      type: PlayerScoresActionType.SET_PLAYER_SCORE,
      name: playerName,
      score: newValue,
    })
  }, []);

  const onSubmit = useCallback(() => {
    if (input) {
      const newTotal = total - parseInt(input);
      if (newTotal < 0) {
        throw Error('Too high! Your turn has ended.');
      }
      if (newTotal === 0) {
        // Declare winner
      }
      setTotal(newTotal);
      setInput("");
    }
  }, [input]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: dartboardWhite
      }}
    >
      <ThemedText style={styles.bigNumber}>
        {total}
      </ThemedText>
      <ThemedText>
        Enter a throw
      </ThemedText>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={onSubmit}
          keyboardType="numeric"
        />
        <Button
          title="Enter"
          onPress={onSubmit}
          color={dartboardGreen}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 72,
    width: 144,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
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