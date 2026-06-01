import { ChatMessage } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Text, View } from 'react-native';

type Props = {
  message: ChatMessage;
  userProfileUri?: string;
  userName?: string;
  botLabel?: string;
  botProfileUri?: string;
  useGenericBotImage?: boolean;
  theme?: {
    bot: { bgColor: string; textColor: string; labelColor: string };
    user: { bgColor: string; textColor: string };
  };
};

const DEFAULT_THEME = {
  bot: {
    bgColor: '#EAEAEA',
    textColor: '#000000',
    labelColor: '#816F6A',
  },
  user: {
    bgColor: '#C34342',
    textColor: '#FFFFFF',
  },
};

export const ChatBubble = ({
  message,
  userProfileUri,
  userName = 'Você',
  botLabel = 'Consultor IA',
  botProfileUri,
  useGenericBotImage = false,
  theme = DEFAULT_THEME,
}: Props) => {
  const isBot = message.type === 'bot';
  const bubbleTheme = isBot ? theme.bot : theme.user;
  const label = isBot ? botLabel : userName;

  return (
    <View className="mb-6 flex flex-col">
      {/* Label acima da bolha */}
      <Text
        className="text-xs font-regular mb-1"
        style={{
          color: isBot ? theme.bot.labelColor : '#000000',
        }}
      >
        {label}
      </Text>

      {/* Container da bolha com foto */}
      <View
        className={`flex flex-row ${isBot ? 'justify-start' : 'justify-end'} gap-2 w-full`}
      >
        {/* Foto do Bot (esquerda) */}
        {isBot && (
          <View className="w-8 h-8 rounded-full mt-1 items-center justify-center flex-shrink-0">
            {useGenericBotImage ? (
              <View className="w-8 h-8 rounded-full bg-gray-300 items-center justify-center">
                <Ionicons name="person" size={16} color="#666666" />
              </View>
            ) : (
              <Image
                source={
                  botProfileUri
                    ? { uri: botProfileUri }
                    : require('@/assets/images/profile-robot.jpg')
                }
                className="w-8 h-8 rounded-full"
              />
            )}
          </View>
        )}

        {/* Bolha de mensagem */}
        <View
          className={`px-4 py-3 rounded-2xl ${isBot ? 'rounded-bl-none w-3/4' : 'rounded-br-none w-3/4'}`}
          style={{
            backgroundColor: bubbleTheme.bgColor,
          }}
        >
          <Text
            style={{
              color: bubbleTheme.textColor,
            }}
            className="font-regular text-base leading-6"
          >
            {message.content}
          </Text>

          {message.timestamp && (
            <Text
              className="text-xs mt-1"
              style={{
                color: isBot ? '#666666' : 'rgba(255,255,255,0.7)',
              }}
            >
              {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          )}
        </View>

        {/* Foto do Usuário (direita) ou Ícone Genérico */}
        {!isBot && (
          <View className="w-8 h-8 rounded-full mt-1 bg-gray-300 items-center justify-center">
            {userProfileUri ? (
              <Image
                source={{ uri: userProfileUri }}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <Ionicons name="person" size={16} color="#666666" />
            )}
          </View>
        )}
      </View>
    </View>
  );
};
