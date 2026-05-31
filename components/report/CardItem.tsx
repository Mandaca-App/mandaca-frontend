import Ionicons from '@expo/vector-icons/Ionicons';

import {
    Pressable,
    Text,
    View,
} from 'react-native';

type Topic = {
    id: number;
    text: string;
};

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    typeCard:
        | 'positive'
        | 'negative'
        | 'recomendation';
    topics: Topic[];
    handlePress: () => void;
};

export const CardItem = ({
    icon,
    typeCard,
    topics,
    handlePress,
}: Props) => {
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

    const config =
        cardConfig[typeCard];

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
                        <Ionicons
                            name={icon}
                            size={26}
                            color="#C34342"
                        />
                    </View>

                    <View className="flex-1">
                        <Text className="text-xl font-bold text-dark">
                            {config.title}
                        </Text>

                        <Text className="text-xs text-black/50 mt-1">
                            {topics.length}{' '}
                            sugest
                            {topics.length > 1
                                ? 'ões'
                                : 'ão'}
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

            <View className="gap-4">
                {topics.map((item) => (
                    <View
                        key={item.id}
                        className="flex-row items-start gap-3"
                    >
                        <View
                            className={`
                                w-2.5 h-2.5 rounded-full mt-2
                                ${config.badge}
                            `}
                        />

                        <Text className="flex-1 text-sm text-black/75 leading-6 font-medium">
                            {item.text}
                        </Text>
                    </View>
                ))}
            </View>

            <Pressable
                className="flex-row items-center justify-center rounded-2xl py-4 gap-3 bg-primary"
                onPress={handlePress}
            >
                <Text className="text-light font-semibold text-base">
                    Ver sugestões
                </Text>

                <Ionicons
                    name="arrow-forward"
                    size={18}
                    color="#FFFFFF"
                />
            </Pressable>
        </View>
    );
};