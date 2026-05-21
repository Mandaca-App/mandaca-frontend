import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { ActivityIndicator, Pressable, TextInput, View } from 'react-native';

type Props = {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  theme?: {
    input: { bgColor: string; textColor: string; placeholderColor: string };
    sendButton: { bgColor: string; iconColor: string };
    divider: string;
  };
};

const DEFAULT_THEME = {
  input: {
    bgColor: '#EAEAEA',
    textColor: '#6B7280',
    placeholderColor: '#6B7280',
  },
  sendButton: {
    bgColor: '#C34342',
    iconColor: '#FFFFFF',
  },
  divider: '#D1D5DB',
};

export const ChatInput = ({
  onSendMessage,
  isLoading = false,
  placeholder = 'Digite sua mensagem...',
  theme = DEFAULT_THEME,
}: Props) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <View
      className="bg-white border-t"
      style={{
        borderTopColor: theme.divider,
        paddingBottom: 8,
      }}
    >
      <View className="flex flex-row items-center justify-center gap-2.5 px-4 pt-3">
        {/* Input Field */}
        <View
          className="flex-1 flex-row items-center rounded-xl px-3 min-h-[48px] max-h-[100px]"
          style={{
            backgroundColor: theme.input.bgColor,
          }}
        >
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder={placeholder}
            placeholderTextColor={theme.input.placeholderColor}
            editable={!isLoading}
            multiline={true}
            maxLength={2000}
            style={{
              color: theme.input.textColor,
            }}
            className="flex-1 text-sm py-2.5 pr-2"
          />
        </View>

        {/* Send Button */}
        <Pressable
          className="w-12 h-12 rounded-full justify-center items-center flex-shrink-0"
          style={{
            backgroundColor: theme.sendButton.bgColor,
            opacity: !message.trim() || isLoading ? 0.5 : 1,
          }}
          onPress={handleSend}
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={theme.sendButton.iconColor}
            />
          ) : (
            <Ionicons
              name="send"
              size={16}
              color={theme.sendButton.iconColor}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};
