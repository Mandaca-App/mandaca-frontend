import Ionicons from '@expo/vector-icons/Ionicons';

import {
    Pressable,
    Text,
    View,
} from 'react-native';

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    typeCard:
        | 'positive'
        | 'negative'
        | 'recomendation';
    text: string;
    suggestions: string;
    automaticSuggestions: boolean;
    handlePress: () => void;
};

export const CardItemFeedback = ({
    icon,
    typeCard,
    text,
    suggestions,
    automaticSuggestions,
    handlePress,
}: Props) => {
    const backgroundColor = {
        positive: 'bg-green-500/30',
        negative: 'bg-red-500/30',
        recomendation: 'bg-blue-500/30',
    };

    const title = {
        positive: 'Pontos positivos',
        negative: 'Pontos negativos',
        recomendation: 'Recomendações',
    };

    return (
        <View
            className={`px-10 py-8 ${backgroundColor[typeCard]} rounded-2xl justify-center gap-6`}
        >
            <View className="flex-row items-center justify-between">
                <Ionicons
                    name={icon}
                    size={28}
                    color="#000000"
                />

                <Text className="text-xl text-dark font-semibold">
                    {title[typeCard]}
                </Text>

                <View className="w-5 h-5" />
            </View>

            <Text className="text-md text-justify text-dark font-semibold">
                {text}
            </Text>

            {automaticSuggestions && (
                <View className="gap-4">
                    <View className="flex-row gap-4 pr-8">
                        <Ionicons
                            name={'arrow-forward'}
                            size={20}
                            color="#000000"
                        />

                        <Text className="font-semibold flex-1">
                            {suggestions}
                        </Text>
                    </View>

                    <Pressable
                        className="flex-row items-center bg-light border border-dark justify-center rounded-xl py-3 gap-3"
                        onPress={handlePress}
                    >
                        <Text className="text-dark font-semibold">
                            Aplicar mudanças
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};