import { CHATBOT_THEME } from '@/constants/theme';
import { ChatMessage } from '@/types';
import { Image, Text, View } from 'react-native';

type Props = {
  message: ChatMessage;
  userProfileUri?: string;
  userName?: string;
};

export const ChatBubble = ({ message, userProfileUri, userName }: Props) => {
  const isBot = message.type === 'bot';
  const theme = isBot ? CHATBOT_THEME.bot : CHATBOT_THEME.user;

  return (
    <View
      className={`mb-6 flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
    >
      {/* Label acima da bolha */}
      <Text
        className="text-xs font-regular mb-1"
        style={{
          color: isBot ? CHATBOT_THEME.bot.labelColor : '#000000',
        }}
      >
        {isBot ? 'Consultor IA' : userName || 'Você'}
      </Text>

      {/* Container da bolha com foto */}
      <View
        className={`flex flex-row ${isBot ? 'justify-start' : 'justify-end'} gap-2 w-full`}
      >
        {/* Foto do Bot (esquerda) */}
        {isBot && (
          <Image
            source={require('@/assets/images/profile-robot.jpg')}
            className="w-8 h-8 rounded-full mt-1"
          />
        )}

        {/* Bolha de mensagem */}
        <View
          className={`px-4 py-3 rounded-2xl w-3/4 ${isBot ? 'rounded-bl-none' : 'rounded-br-none'}`}
          style={{
            backgroundColor: theme.bgColor,
          }}
        >
          <Text
            style={{
              color: theme.textColor,
            }}
            className="font-regular text-base leading-6"
          >
            {message.content}
          </Text>
        </View>

        {/* Foto do Usuário (direita) */}
        {!isBot && (
          <Image
            source={
              userProfileUri
                ? { uri: userProfileUri }
                : require('@/assets/images/profile-robot.jpg')
            }
            className="w-8 h-8 rounded-full mt-1"
          />
        )}
      </View>
    </View>
  );
};
