import Ionicons from '@expo/vector-icons/Ionicons';

import { router } from 'expo-router';

import type { ComponentProps } from 'react';

import {
    Pressable,
    Text,
    View,
} from 'react-native';

type IoniconName =
    ComponentProps<typeof Ionicons>['name'];

type Props = {
    title: string;
    showBackButton?: boolean;
    showNotificationButton?: boolean;
    onBackPress?: () => void;
    onNotificationPress?: () => void;
    rightButtonIcon?: IoniconName;
    rightButtonColor?: string;
    rightButtonBgColor?: string;
    backButtonColor?: string;
    backButtonBgColor?: string;
    backButtonSize?: number;
};

export const Header = ({
    title,
    showBackButton = false,
    showNotificationButton = true,
    onBackPress,
    onNotificationPress,
    rightButtonIcon,
    rightButtonColor = '#2C2C2C',
    rightButtonBgColor = '#FFFFFF',
    backButtonColor = '#2C2C2C',
    backButtonSize = 18,
}: Props) => {
    const handleBack = onBackPress
        ? onBackPress
        : () => router.back();

    const handleNotification =
        onNotificationPress
            ? onNotificationPress
            : () =>
                  router.navigate(
                      '/notifications',
                  );

    return (
        <View className="flex-row items-center justify-between mb-2">
            <View className="w-14 items-start">
                {showBackButton ? (
                    <Pressable
                        className="w-11 h-11 rounded-2xl border border-black/5 bg-light items-center justify-center"
                        onPress={handleBack}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={
                                backButtonSize
                            }
                            color={
                                backButtonColor
                            }
                        />
                    </Pressable>
                ) : (
                    <View className="w-11 h-11" />
                )}
            </View>

            <View className="flex-1 items-center px-3">
                <Text
                    numberOfLines={1}
                    className="text-[22px] font-bold text-dark text-center"
                >
                    {title}
                </Text>
            </View>

            <View className="w-14 items-end">
                {showNotificationButton ? (
                    <Pressable
                        className="w-11 h-11 rounded-2xl border border-black/5 items-center justify-center bg-light"
                        style={{
                            backgroundColor:
                                rightButtonBgColor,
                        }}
                        onPress={
                            handleNotification
                        }
                    >
                        <Ionicons
                            name={
                                rightButtonIcon ||
                                'notifications'
                            }
                            size={22}
                            color={
                                rightButtonColor
                            }
                        />
                    </Pressable>
                ) : (
                    <View className="w-11 h-11" />
                )}
            </View>
        </View>
    );
};