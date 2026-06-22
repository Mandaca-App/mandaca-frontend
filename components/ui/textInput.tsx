import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, TextInput as RNTextInput, Text, View } from 'react-native';

type Props = {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  editable?: boolean;
};

export const TextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  editable = true,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full gap-2">
      {label && (
        <Text className="text-base font-semibold text-dark">{label}</Text>
      )}
      <View
        className={`flex-row items-center border rounded-lg px-4 py-3 ${
          isFocused ? 'border-primary bg-light' : 'border-secondary bg-light'
        }`}
      >
        <RNTextInput
          className="flex-1 text-dark text-base"
          placeholder={placeholder}
          placeholderTextColor="#999999"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          editable={editable}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className="ml-2"
          >
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={24}
              color="#C34342"
            />
          </Pressable>
        )}
      </View>
      {error && <Text className="text-sm text-red-600">{error}</Text>}
    </View>
  );
};
