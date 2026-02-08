import { useCallback, useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import SetupContext from "@/contexts/SetupContext";
import { PlayerScoresActionType } from "@/hooks/usePlayerScores";
import { useRouter } from "expo-router";
import { dartboardGreen, dartboardRed } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Index() {
  const router = useRouter();
  const textColor = useThemeColor({}, 'text');
  const textDisabledColor = useThemeColor({}, 'textDisabled');
  const backgroundColor = useThemeColor({}, 'background');
  const backgroundTintColor = useThemeColor({}, 'backgroundTint');

  const setup = useContext(SetupContext);
  const [players, setPlayers] = useState<string[]>([""]);
  const [initialScore, setInitialScore] = useState<string>("");

  const setPlayer = useCallback((index: number) => {
    return (newValue: string) => {
      if (index === players.length - 1 && newValue) {
        setPlayers((prev) => {
          const newPlayers = [...prev];
          newPlayers.push("");
          return newPlayers;
        });
      }
      setPlayers((prev => {
        const newPlayers = [...prev];
        newPlayers[index] = newValue;
        return newPlayers;
      }));
    }
  }, [players, setPlayers]);

  const removePlayer = useCallback((index: number) => {
    return () => {
      if (index === players.length - 1) {
        setPlayers((prev) => {
          const newPlayers = [...prev];
          newPlayers[index] = "";
          return newPlayers;
        });
      } else {
        setPlayers((prev => {
          return [...prev.slice(0, index), ...prev.slice(index + 1)];
        }));
      }
    }
  }, [players, setPlayers]);

  const setInitial = useCallback((initial: string) => {
    const newValue = parseInt(initial);
    if (newValue <= 1) {
      throw Error("Initial score must be greater than 1");
    }
    if (newValue > 9999) {
      throw Error("Initial score must be less than 10,000");
    }
    setup.setInitial(newValue);
  }, [setup.setInitial]);

  const onDone = useCallback(() => {
    players.forEach((input: string) => {
      if (input) {
        setup.dispatchPlayerScores({
          type: PlayerScoresActionType.ADD_PLAYER,
          name: input,
        });
      }
    });
    setInitial(initialScore);
    router.navigate('/Scores');
  }, [initialScore, setup.dispatchPlayerScores]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        backgroundColor: backgroundColor
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 245,
        }}
      >
        <ThemedText type="subtitle">
          Players
        </ThemedText>
        {
          players.map((player: string, index: number, arr: string[]) => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                alignSelf: "flex-start"
              }}
              key={index}
            >
              <TextInput
                id={`player-input-${index}`}
                style={{
                  ...styles.input,
                  backgroundColor: backgroundTintColor,
                  color: textColor
                }}
                value={player}
                onChangeText={setPlayer(index)}
                placeholder="Enter a name"
                placeholderTextColor={textDisabledColor}
                onSubmitEditing={() => {
                  player && document.getElementById(`player-input-${index + 1}`)?.focus()
                }}
              />
              {<Button
                title="-"
                onPress={removePlayer(index)}
                color={dartboardRed}
                disabled={index === arr.length - 1}
              />}
            </View>
          ))
        }
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText type="subtitle">
          Initial Score
        </ThemedText>
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: backgroundTintColor,
            color: textColor
          }}
          value={initialScore}
          onChangeText={setInitialScore}
          keyboardType="numeric"
        />
      </View>
      <Button
        title="Done"
        onPress={onDone}
        color={dartboardGreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 32,
    minWidth: 144,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    flexGrow: 1
  }
})
