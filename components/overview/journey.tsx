// components/enterprise/Journey.tsx

import Ionicons from '@expo/vector-icons/Ionicons';

import {
    Text,
    View,
} from 'react-native';

import Carousel from './carousel';

type Props = {
    story: string;
};

export default function Journey({
    story,
}: Props) {
    return (
        <View
            className="
                bg-light border border-black/5
                rounded-[32px]
                overflow-hidden
            "
        >
            <View className="px-6 pt-6 pb-5 gap-5">
                <View className="flex-row items-center gap-4">
                    <View
                        className="
                            w-14 h-14 rounded-2xl
                            bg-primary/10
                            items-center justify-center
                        "
                    >
                        <Ionicons
                            name="restaurant"
                            size={28}
                            color="#C34342"
                        />
                    </View>

                    <View className="flex-1">
                        <Text className="text-2xl font-bold text-dark">
                            Nossa jornada
                        </Text>

                        <Text className="text-black/50 text-sm mt-1">
                            Conheça a essência do restaurante
                        </Text>
                    </View>
                </View>

                <Carousel />

                <View
                    className="
                        bg-primary/5
                        border border-primary/10
                        rounded-3xl
                        px-5 py-5
                    "
                >
                    <Text className="text-base leading-7 text-black/70 text-justify">
                        {story}
                    </Text>
                </View>
            </View>
        </View>
    );
}