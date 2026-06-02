import Ionicons from '@expo/vector-icons/Ionicons';

import { ComponentProps } from 'react';

import { Pressable, Text, View } from 'react-native';

type Props = {
  icon: ComponentProps<typeof Ionicons>['name'];

  title: string;

  hasNotification?: boolean;

  onPress: () => void;
};

export const AccessCard = ({
  icon,
  title,
  hasNotification = false,
  onPress,
}: Props) => {
  return (
    <Pressable
      className="
                bg-light border border-black/5
                rounded-3xl px-5 py-5
                flex-row items-center gap-4
            "
      onPress={onPress}
    >
      <View
        className="
                    w-16 h-16 rounded-2xl
                    bg-primary/10
                    justify-center items-center
                "
      >
        <Ionicons name={icon} size={30} color="#C34342" />
      </View>

      <View className="flex-1 gap-2">
        <View className="flex-row items-center gap-2">
          <Text
            className="
                            text-lg font-bold
                            text-dark flex-1
                        "
          >
            {title}
          </Text>

          {hasNotification && (
            <View
              className="
                                px-2 py-1 rounded-full
                                bg-primary/10
                                flex-row items-center gap-1
                            "
            >
              <Ionicons name="notifications" size={12} color="#C34342" />

              <Text
                className="
                                    text-[10px]
                                    font-bold
                                    text-primary
                                "
              >
                Novo
              </Text>
            </View>
          )}
        </View>

        <Text className="text-sm text-black/50 leading-5">
          Acesse rapidamente esta área do aplicativo.
        </Text>

        <View className="flex-row items-center gap-2 mt-1">
          <Text className="text-primary font-semibold">Abrir</Text>

          <Ionicons name="arrow-forward" size={16} color="#C34342" />
        </View>
      </View>
    </Pressable>
  );
};
