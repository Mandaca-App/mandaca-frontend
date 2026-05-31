import Ionicons from '@expo/vector-icons/Ionicons';

import { ComponentProps } from 'react';

import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type Variant =
    | 'highlight'
    | 'secondary';

type Props = {
    icon: ComponentProps<typeof Ionicons>['name'];
    title: string;
    description: string;
    route: () => void;
    variant?: Variant;
};

export const GridBox = ({
    icon,
    title,
    description,
    route,
    variant = 'secondary',
}: Props) => {
    const isHighlight =
        variant === 'highlight';

    return (
        <Pressable
            onPress={route}
            className={`
                rounded-3xl border overflow-hidden
                ${
                    isHighlight
                        ? 'bg-light border-primary/20 px-6 py-7 h-64'
                        : 'bg-light border-black/5 px-4 py-5 h-52'
                }
            `}
            style={styles.cardShadow}
        >
            {isHighlight && (
                <View className="absolute top-0 left-0 w-2 h-64 bg-primary rounded-b-full" />
            )}

            <View
                className={`
                    rounded-2xl items-center justify-center self-start
                    ${
                        isHighlight
                            ? 'w-16 h-16 bg-primary/10'
                            : 'w-14 h-14 bg-primary/10'
                    }
                `}
            >
                <Ionicons
                    name={icon}
                    size={
                        isHighlight
                            ? 32
                            : 26
                    }
                    color="#C34342"
                />
            </View>

            <View className="flex-1 justify-between mt-5">
                <View className="gap-2">
                    <Text
                        className={`
                            font-bold
                            ${
                                isHighlight
                                    ? 'text-2xl text-dark'
                                    : 'text-lg text-dark'
                            }
                        `}
                    >
                        {title}
                    </Text>

                    <Text
                        className={`
                            leading-5
                            ${
                                isHighlight
                                    ? 'text-black/60 text-sm'
                                    : 'text-black/60 text-xs'
                            }
                        `}
                    >
                        {description}
                    </Text>
                </View>

                <View className="flex-row items-center gap-2 mt-5">
                    <Text className="font-semibold text-primary">
                        Acessar
                    </Text>

                    <Ionicons
                        name="arrow-forward"
                        size={18}
                        color="#C34342"
                    />
                </View>
            </View>
        </Pressable>
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