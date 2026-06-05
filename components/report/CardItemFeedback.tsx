import Ionicons from '@expo/vector-icons/Ionicons';

import { useEffect, useState } from 'react';

import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  typeCard: 'positive' | 'negative' | 'recomendation';
  text: string;
  suggestions: string;
  automaticSuggestions: boolean;
  handlePress: () => Promise<void>;
};

export const CardItemFeedback = ({
  icon,
  typeCard,
  text,
  suggestions,
  automaticSuggestions,
  handlePress,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const [applied, setApplied] = useState(false);

  const cardConfig = {
    positive: {
      title: 'Pontos positivos',
      badge: 'bg-emerald-500',
      bg: 'bg-emerald-500/5',
      border: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/10',
    },

    negative: {
      title: 'Pontos negativos',
      badge: 'bg-rose-500',
      bg: 'bg-rose-500/5',
      border: 'border-rose-500/20',
      iconBg: 'bg-rose-500/10',
    },

    recomendation: {
      title: 'Recomendações',
      badge: 'bg-cyan-500',
      bg: 'bg-cyan-500/5',
      border: 'border-cyan-500/20',
      iconBg: 'bg-cyan-500/10',
    },
  };

  const config = cardConfig[typeCard];

  const handleApply = async () => {
    try {
      setLoading(true);

      await handlePress();

      setApplied(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (applied) {
      const timeout = setTimeout(() => {
        setApplied(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [applied]);

  return (
    <View
      className={`
                rounded-3xl border px-6 py-7 gap-6
                ${config.bg}
                ${config.border}
            `}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4 flex-1">
          <View
            className={`
                            w-14 h-14 rounded-2xl items-center justify-center
                            ${config.iconBg}
                        `}
          >
            <Ionicons name={icon} size={26} color="#C34342" />
          </View>

          <View className="flex-1">
            <Text className="text-xl font-bold text-dark">{config.title}</Text>

            <Text className="text-xs text-black/50 mt-1">
              Sugestão automática
            </Text>
          </View>
        </View>

        <View
          className={`
                        w-4 h-4 rounded-full
                        ${config.badge}
                    `}
        />
      </View>

      <Text className="text-base leading-7 text-black/75 font-medium">
        {text}
      </Text>

      {automaticSuggestions && (
        <View className="gap-5">
          <View
            className={`
                            rounded-2xl border px-4 py-4 flex-row gap-3
                            bg-light/80 border-black/5
                        `}
          >
            <View className="pt-1">
              <Ionicons name="sparkles" size={18} color="#C34342" />
            </View>

            <Text className="flex-1 text-sm leading-6 text-black/70 font-medium">
              {suggestions}
            </Text>
          </View>

          <Pressable
            className={`
                            flex-row items-center justify-center rounded-2xl py-4 gap-3
                            ${applied ? 'bg-emerald-500' : 'bg-primary'}
                        `}
            onPress={handleApply}
            disabled={loading || applied}
          >
            {loading ? (
              <>
                <ActivityIndicator size="small" color="#FFFFFF" />

                <Text className="text-light font-semibold text-base">
                  Aplicando...
                </Text>
              </>
            ) : applied ? (
              <>
                <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />

                <Text className="text-light font-semibold text-base">
                  Mudança aplicada
                </Text>
              </>
            ) : (
              <>
                <Text className="text-light font-semibold text-base">
                  Aplicar mudanças
                </Text>

                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};
