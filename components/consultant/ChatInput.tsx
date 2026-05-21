import { CHATBOT_THEME } from '@/constants/theme';
import { transcribeAudio } from '@/services/chatService';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  useAudioRecorder,
} from 'expo-audio';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  TextInput,
  View,
} from 'react-native';
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
  const [isTranscribing, setIsTranscribing] = useState(false);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const startRecording = async () => {
    try {
      const permission = await requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Permissão necessária',
          'Ative o microfone nas configurações do dispositivo.',
        );
        return;
      }
      await recorder.prepareToRecordAsync();
      recorder.record();
      scale.value = withRepeat(withTiming(1.2, { duration: 600 }), -1, true);
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
    }
  };

  const stopRecording = async () => {
    try {
      scale.value = withTiming(1);
      setIsTranscribing(true);
      await recorder.stop();

      const uri = recorder.uri;
      if (!uri) return;

      const transcription = await transcribeAudio(uri);
      if (transcription) {
        setMessage(transcription);
      }
    } catch (error) {
      console.error('Erro ao transcrever áudio:', error);
      Alert.alert(
        'Erro',
        'Não foi possível transcrever o áudio. Tente novamente.',
      );
    } finally {
      setIsTranscribing(false);
    }
  };

  const isBusy = isLoading || isTranscribing;

  return (
    <View
      className="bg-white border-t"
      style={{
        borderTopColor: CHATBOT_THEME.divider,
        paddingBottom: 8,
      }}
    >
      <View className="flex flex-row items-center justify-center gap-2.5 px-4 pt-3">
        {/* Mic Button */}
        <Animated.View style={animatedStyle}>
          <Pressable
            className="w-10 h-10 rounded-full justify-center items-center"
            style={{
              backgroundColor: recorder.isRecording
                ? CHATBOT_THEME.sendButton.bgColor
                : CHATBOT_THEME.input.bgColor,
            }}
            onPressIn={startRecording}
            onPressOut={stopRecording}
            disabled={isBusy && !recorder.isRecording}
          >
            {isTranscribing ? (
              <ActivityIndicator
                size="small"
                color={CHATBOT_THEME.sendButton.bgColor}
              />
            ) : (
              <Ionicons
                name="mic"
                size={20}
                color={
                  recorder.isRecording
                    ? '#FFFFFF'
                    : CHATBOT_THEME.sendButton.bgColor
                }
              />
            )}
          </Pressable>
        </Animated.View>

        {/* Input Field */}
        <View
          className="flex-1 flex-row items-center rounded-xl px-3 min-h-[48px] max-h-[100px]"
          style={{
            backgroundColor: CHATBOT_THEME.input.bgColor,
          }}
        >
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder={
              recorder.isRecording ? 'Gravando...' : 'Digite sua mensagem...'
            }
            placeholderTextColor={CHATBOT_THEME.input.placeholderColor}
            editable={!isBusy}
            multiline={true}
            maxLength={2000}
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
            opacity: !message.trim() || isBusy ? 0.5 : 1,
          }}
          onPress={handleSend}
          disabled={!message.trim() || isBusy}
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
