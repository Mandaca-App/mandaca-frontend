import { CHATBOT_THEME } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
    Pressable,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    onSendMessage: (message: string) => void;
    isLoading?: boolean;
};

export const ChatInput = ({ onSendMessage, isLoading = false }: Props) => {
    const [message, setMessage] = useState('');
    const insets = useSafeAreaInsets();

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
                borderTopColor: CHATBOT_THEME.divider,
                paddingBottom: Math.max(insets.bottom, 8),
            }}
        >
            <View className="flex flex-row items-center justify-center gap-2.5 px-4 pt-3">
                {/* Input Field Container */}
                <View
                    className="flex-1 flex-row items-center rounded-xl px-3 min-h-[48px] max-h-[100px]"
                    style={{
                        backgroundColor: CHATBOT_THEME.input.bgColor,
                    }}
                >
                    {/* Microphone Button */}
                    <Pressable
                        className="p-1.5 mr-2"
                        disabled={isLoading}
                    >
                        <Ionicons
                            name="mic"
                            size={22}
                            color={CHATBOT_THEME.sendButton.bgColor}
                        />
                    </Pressable>

                    {/* Text Input */}
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Digite sua mensagem..."
                        placeholderTextColor={CHATBOT_THEME.input.placeholderColor}
                        editable={!isLoading}
                        multiline={true}
                        maxLength={500}
                        style={{
                            color: CHATBOT_THEME.input.textColor,
                        }}
                        className="flex-1 text-sm py-2.5 pr-2"
                    />
                </View>

                {/* Send Button */}
                <Pressable
                    className="w-12 h-12 rounded-full justify-center items-center flex-shrink-0"
                    style={{
                        backgroundColor: CHATBOT_THEME.sendButton.bgColor,
                        opacity: !message.trim() || isLoading ? 0.5 : 1,
                    }}
                    onPress={handleSend}
                    disabled={!message.trim() || isLoading}
                >
                    <Ionicons
                        name="send"
                        size={16}
                        color={CHATBOT_THEME.sendButton.iconColor}
                    />
                </Pressable>
            </View>
        </View>
    );
};
