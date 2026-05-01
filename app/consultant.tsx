import { ChatBubble } from '@/components/consultant/ChatBubble';
import { ChatInput } from '@/components/consultant/ChatInput';
import { SuggestionCards } from '@/components/consultant/SuggestionCards';
import { CHATBOT_THEME } from '@/constants/theme';
import { getChatHistory, sendChatMessage } from '@/services/chatService';
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

const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';
const USER_ID = '453df15b-61ce-4571-8bdb-cdbedf0ff041';

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
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const history = await getChatHistory(ENTERPRISE_ID);
        if (history.length > 0) {
          setMessages((prev) => [...prev, ...history]);
        }
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      } finally {
        setIsLoadingHistory(false);
      }

      try {
        const responseUser = await axios.get(
          `https://mandaca-backend.onrender.com/users/${USER_ID}`,
          { timeout: 4000 },
        );

        setUser(responseUser.data);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: content,
      timestamp: new Date(),
      contentType: 'text',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAwaitingResponse(true);
    setShowSuggestions(false);

    try {
      const reply = await sendChatMessage(content, ENTERPRISE_ID);

      const botResponse: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: reply,
        timestamp: new Date(),
        contentType: 'text',
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error: any) {
      console.error('Erro ao enviar mensagem:', error);

      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
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
            isAwaitingResponse || isLoadingHistory ? (
              <View className="px-4 py-2">
                <ActivityIndicator size="small" color="#C34342" />
              </View>
            ) : null
          }
        />

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <Pressable
            className="absolute right-4 w-11 h-11 rounded-full justify-center items-center shadow-md"
            style={{
              backgroundColor: CHATBOT_THEME.input.bgColor,
              elevation: 5,
              bottom: 130,
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
        <SuggestionCards
          onSuggestionPress={handleSendMessage}
          isVisible={showSuggestions}
        />
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isAwaitingResponse}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
