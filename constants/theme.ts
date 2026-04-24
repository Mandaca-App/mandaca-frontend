/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
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

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif',
    serif: 'Georgia, \'Times New Roman\', serif',
    rounded:
      '\'SF Pro Rounded\', \'Hiragino Maru Gothic ProN\', Meiryo, \'MS PGothic\', sans-serif',
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, \'Liberation Mono\', \'Courier New\', monospace',
  },
});

export const SENTIMENT_CONFIG = {
  positiva: {
    label: 'Positiva',
    bgColor: '#E0F9F0',
    textColor: '#00896B',
  },
  negativa: {
    label: 'Negativa',
    bgColor: '#FDE8E8',
    textColor: '#C62828',
  },
  neutra: {
    label: 'Neutra',
    bgColor: '#F5F5F5',
    textColor: '#424242',
  },
  sugestao: {
    label: 'Sugestão',
    bgColor: '#FFF3E0',
    textColor: '#E65100',
  },
  duvida: {
    label: 'Dúvida',
    bgColor: '#E1F5FE',
    textColor: '#0D47A1',
  },
};
