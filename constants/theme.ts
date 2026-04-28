/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { ReviewSentiment } from '@/types/reviewSentiment';
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

export const sentimentConfig: Record<
  ReviewSentiment,
  { label: string; bgColor: string; textColor: string }
> = {
  elogios: {
    label: 'Elogios',
    bgColor: '#E6F4EA',
    textColor: '#2E7D32',
  },
  dicas: {
    label: 'Dicas',
    bgColor: '#FFF8E1',
    textColor: '#F9A825',
  },
  duvidas: {
    label: 'Dúvidas',
    bgColor: '#E3F2FD',
    textColor: '#1565C0',
  },
};
