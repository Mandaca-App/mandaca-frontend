import { useState } from 'react';
import {
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';

type EnterpriseInputProps = {
    label: string;
    value: string;
    onChangeText: (value: string) => void;
    placeholder: string;
    error?: string;
    isTime?: boolean;
};

const formatHourInput = (value: string) => {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 2) {
        return numbers;
    }

    return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
};

export const formatHour = (time: string | null) => {
    if (!time) {
        return '';
    }

    return time.slice(0, 5);
};

export default function EnterpriseInput({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    isTime = false,
}: EnterpriseInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = error
        ? 'border-red-500'
        : isFocused
          ? 'border-primary'
          : 'border-black/15';

    const handleChange = (text: string) => {
        if (isTime) {
            onChangeText(formatHourInput(text));
            return;
        }

        onChangeText(text);
    };

    return (
        <View className="gap-1">
            <Text className="text-base font-semibold">
                {label}
            </Text>

            <Pressable
                className={`
                    w-full
                    bg-white
                    border
                    rounded-xl
                    px-4
                    py-2
                    ${borderColor}
                `}
            >
                <TextInput
                    value={value}
                    onChangeText={handleChange}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType={
                        isTime ? 'numeric' : 'default'
                    }
                    maxLength={isTime ? 5 : undefined}
                    className="text-base text-black"
                />
            </Pressable>

            {error && (
                <Text className="text-red-500 text-xs">
                    {error}
                </Text>
            )}
        </View>
    );
}