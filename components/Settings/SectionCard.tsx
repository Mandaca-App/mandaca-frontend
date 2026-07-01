import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  children: React.ReactNode;
  isDark?: boolean;
};

export const SectionCard = ({ title, icon, children, isDark = false }: Props) => {
  return (
    <View
      className={`rounded-3xl border overflow-hidden px-6 py-6 ${
        isDark
          ? 'bg-[#1E1E1E] border-white/10'
          : 'bg-light border-black/5'
      }`}
      style={styles.cardShadow}
    >
      <View className="flex-row items-center gap-3 mb-5">
        <View
          className={`w-10 h-10 rounded-xl items-center justify-center ${
            isDark ? 'bg-primary/20' : 'bg-primary/10'
          }`}
        >
          <Ionicons name={icon} size={20} color="#C34342" />
        </View>

        <Text
          className={`text-lg font-bold ${
            isDark ? 'text-white' : 'text-dark'
          }`}
          accessibilityRole="header"
        >
          {title}
        </Text>
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
});
