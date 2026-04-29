import { ChatBubble } from '@/components/consultant/ChatBubble';
import { ChatInput } from '@/components/consultant/ChatInput';
import { CHATBOT_THEME } from '@/constants/theme';
import { ChatMessage } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_BOT_MESSAGE = `Olá! Sou seu consultor virtual.
Como posso ajudar com a gestão
do seu restaurante hoje?`;

export default function Consultant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: INITIAL_BOT_MESSAGE,
      timestamp: new Date(),
      contentType: 'text',
    },
  ]);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Carrega dados do usuário sem bloquear a renderização inicial do chat
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = '453df15b-61ce-4571-8bdb-cdbedf0ff041';

        const responseUser = await axios.get(
          `https://mandaca-backend.onrender.com/users/${userId}`,
          { timeout: 4000 },
        );

        setUser(responseUser.data);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    };

    loadUser();
  }, []);

  // Scroll automático para a última mensagem quando nova mensagem chega
  useEffect(() => {
    if (messages.length > 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Adiciona mensagem do usuário
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date(),
      contentType: 'text',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAwaitingResponse(true);

    try {
      // Requisição para buscar resposta do backend:

      // Simulando delay de resposta (temporario)
      await new Promise((resolve) => setTimeout(resolve, 800));

      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content:
          'Entendo. Este é um exemplo de resposta do bot. Em produção, isso virá do backend com orientações específicas para seu restaurante.',
        timestamp: new Date(),
        contentType: 'text',
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content:
          'Desculpe, houve um erro ao processar sua mensagem. Tente novamente.',
        timestamp: new Date(),
        contentType: 'text',
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsAwaitingResponse(false);
    }
  };

  const handleScrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
    setShowScrollButton(false);
  };

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    // Mostra botão se o usuário não está no final da lista
    const isAtBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 100;
    setShowScrollButton(!isAtBottom && messages.length > 3);
  };

  return (
    <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
      {/* Main Content Container */}
      <View className="flex-1 bg-background">
        {/* Header */}
        <View className="px-6 py-4 border-b border-gray-200">
          <View className="flex flex-row justify-center">
            <Text className="text-xl font-semibold text-gray-800">
              Consultor Virtual
            </Text>
          </View>
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <ChatBubble
              message={item}
              userProfileUri={user?.url_foto_usuario}
              userName={user?.nome}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingVertical: 16,
            paddingHorizontal: 12,
            flexGrow: 1,
          }}
          keyboardDismissMode={
            Platform.OS === 'ios' ? 'interactive' : 'on-drag'
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ListFooterComponent={
            isAwaitingResponse ? (
              <View className="px-4 py-2">
                <ActivityIndicator size="small" color="#C34342" />
              </View>
            ) : null
          }
        />

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <Pressable
            className="absolute right-4 bottom-24 w-11 h-11 rounded-full justify-center items-center shadow-md"
            style={{
              backgroundColor: CHATBOT_THEME.input.bgColor,
              elevation: 5,
            }}
            onPress={handleScrollToBottom}
          >
            <Ionicons name="arrow-down" size={16} color="#6B7280" />
          </Pressable>
        )}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isAwaitingResponse}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
