import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const MAX_LENGTH = 300;

type Props = {
  text: string;
  setText: (s: string) => void;
  error?: string;
};

export default function InputBox({ text, setText, error }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? 'border-red-500'
    : isFocused
    ? 'border-black'
    : 'border-black/15';

  return (
    <View className="gap-1">
      <View
        className={`
          w-full rounded-xl px-4 py-3 h-60 bg-white border
          ${borderColor}
        `}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Digite a história do seu restaurante..."
          placeholderTextColor="#999"
          multiline
          maxLength={MAX_LENGTH}
          textAlignVertical="top"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="text-base text-black"
        />
      </View>

      {error && (
        <Text className="text-red-500 text-xs">{error}</Text>
      )}

      <Text className="text-right text-xs text-black/40">
        {text.length}/{MAX_LENGTH}
      </Text>
    </View>
  );
}