import { ColorValue } from "react-native";

export const dartboardRed = "#e6302a";
export const dartboardGreen = "#159538";
export const dartboardWhite = "#fbe2b8";
export const dartboardWhitePaler = "#fff8eb";

type ColorString = ColorValue & string;

interface ColorScheme {
  text: ColorString
  textTint: ColorString
  textDisabled: ColorString
  background: ColorString
  backgroundTint: ColorString
  primary: ColorString
  secondary: ColorString
}

interface ColorSchemes {
  [key: string]: ColorScheme;
}

export const Colors: ColorSchemes = {
  light: {
    text: 'black',
    textTint: '#323232',
    textDisabled: '#c0c0c0',
    background: dartboardWhite,
    backgroundTint: dartboardWhitePaler,
    primary: dartboardGreen,
    secondary: dartboardRed,
  },
  dark: {
    text: dartboardWhite,
    textTint: dartboardWhitePaler,
    textDisabled: '#808080',
    background: 'black',
    backgroundTint: '#323232',
    primary: dartboardGreen,
    secondary: dartboardRed,
  },
};
