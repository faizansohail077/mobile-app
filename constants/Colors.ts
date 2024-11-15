/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  primary_blue:"rgba(33, 150, 243, 1)",
  disabled:"rgba(0, 0, 0, 0.12)",
  light_black:"rgba(0, 0, 0, 0.6)",
  white:"#ffffff",
  red:"rgba(240, 68, 56, 1)",
  dark_red:"rgba(211, 47, 47, 1)",
  orange:"rgba(239, 108, 0, 1)",
  green:"rgba(46, 125, 50, 1)",
  dark_blue:"rgba(2, 136, 209, 1)",
  purple:"rgba(156, 39, 176, 1)",
  light_grey:"rgba(0, 0, 0, 0.08)",
  black:'black',
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
