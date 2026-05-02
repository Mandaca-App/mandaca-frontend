import { CHATBOT_THEME } from '@/constants/theme';
import { useAudioRecording } from '@/hooks/useAudioRecording';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState } from 'react';
import { Alert, Pressable, TextInput, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
};

export const ChatInput = ({ onSendMessage, isLoading = false }: Props) => {
  const [message, setMessage] = useState('');
  const {
    startRecording,
    stopRecording,
    isRecording,
    isLoading: isAudioLoading,
    error: audioError,
  } = useAudioRecording();
  const scale = useSharedValue(1);
  const micButtonRef = useRef<View>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleMicPressIn = async () => {
    const success = await startRecording();
    if (success) {
      scale.value = withRepeat(withTiming(1.2, { duration: 600 }), -1, true);
    } else if (audioError) {
      Alert.alert('Erro', audioError);
    }
  };

  const handleMicPressOut = async () => {
    scale.value = withTiming(1);
    const transcribedText = await stopRecording();

    if (transcribedText) {
      setMessage(transcribedText);
    } else if (audioError) {
      Alert.alert('Erro', audioError || 'Falha ao transcrever áudio');
    }
  };

  const animatedMicStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View
      className="bg-white border-t"
      style={{
        borderTopColor: CHATBOT_THEME.divider,
        paddingBottom: 8,
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
          <Animated.View style={animatedMicStyle}>
            <Pressable
              className="p-1.5 mr-2"
              disabled={isLoading || isAudioLoading}
              onPressIn={handleMicPressIn}
              onPressOut={handleMicPressOut}
              ref={micButtonRef}
            >
              <Ionicons
                name="mic"
                size={22}
                color={isRecording ? '#FF6B6B' : CHATBOT_THEME.sendButton.bgColor}
              />
            </Pressable>
          </Animated.View>

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
