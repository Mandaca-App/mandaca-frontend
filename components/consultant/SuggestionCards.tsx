import { CHATBOT_THEME } from '@/constants/theme';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export interface SuggestionCardsProps {
    onSuggestionPress: (suggestion: string) => void;
    isVisible: boolean;
}

const SUGGESTIONS = [
    'O que devo melhorar atualmente?',
    'Como aumentar minhas vendas?',
    'Como precificar meus produtos?',
    'Qual é meu melhor prato para vender?',
];

export const SuggestionCards: React.FC<SuggestionCardsProps> = ({
    onSuggestionPress,
    isVisible,
}) => {
    if (!isVisible) return null;

    return (
        <View className="px-4 py-3 bg-white border-t border-gray-200">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingHorizontal: 4,
                    gap: 10,
                }}
            >
                {SUGGESTIONS.map((suggestion, index) => (
                    <Pressable
                        key={index}
                        onPress={() => onSuggestionPress(suggestion)}
                        className="px-4 py-2.5 rounded-lg border-2 justify-center items-center min-w-max active:opacity-70"
                        style={{
                            borderColor: CHATBOT_THEME.user.bgColor,
                            backgroundColor: '#FFFFFF',
                        }}
                    >
                        <Text
                            style={{ color: CHATBOT_THEME.user.bgColor }}
                            className="font-medium text-xs text-center"
                            numberOfLines={2}
                        >
                            {suggestion}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};
