import { Header } from '@/components/general/header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpScreen: React.FC = () => {
  const router = useRouter();

  const handleSendEmail = async () => {
    const email = 'suporte@mandaca.com.br';
    const subject = encodeURIComponent('Suporte - Central de Ajuda Mandacá');
    try {
      const url = `mailto:${email}?subject=${subject}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erro', 'Não foi possível abrir o aplicativo de e-mail.');
      }
    } catch {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar abrir o e-mail.');
    }
  };

  const handleStartChat = () => {
    router.push('/consultant' as any);
  };

  const handleTutorials = () => {
    Alert.alert('Em breve', 'A seção de tutoriais estará disponível em breve.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerWrapper}>
          <Header
            title="Ajuda"
            showBackButton
            showNotificationButton={false}
            onBackPress={() => router.back()}
          />
        </View>

        {/* Chatbot Card */}
        <View style={styles.chatbotCard}>
          <Ionicons name="headset-outline" size={52} color="#C34342" />
          <Text style={styles.chatbotTitle}>Chatbot</Text>
          <Text style={styles.chatbotDescription}>
            Obtenha respostas rápidas e automáticas para suas dúvidas a qualquer
            hora
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleStartChat}
            style={styles.startChatButton}
          >
            <Text style={styles.startChatButtonText}>Iniciar Conversa</Text>
          </TouchableOpacity>
        </View>

        {/* List Items */}
        <View style={styles.listContainer}>
          {/* Tutoriais */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleTutorials}
            style={styles.listItem}
          >
            <View style={styles.listIconWrapper}>
              <Ionicons name="school-outline" size={28} color="#C34342" />
            </View>
            <View style={styles.listTextWrapper}>
              <Text style={styles.listTitle}>Tutoriais</Text>
              <Text style={styles.listSubtitle}>Aprenda a usar o app</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#C34342" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Fale Conosco */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSendEmail}
            style={styles.listItem}
          >
            <View style={styles.listIconWrapper}>
              <Ionicons name="mail-outline" size={28} color="#C34342" />
            </View>
            <View style={styles.listTextWrapper}>
              <Text style={styles.listTitle}>Fale Conosco</Text>
              <Text style={styles.listSubtitle}>Envie-nos um e-mail</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#C34342" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7FA',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#F8F7FA',
  },
  // Chatbot card
  chatbotCard: {
    marginHorizontal: 24,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  chatbotTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1C',
    marginTop: 12,
  },
  chatbotDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
  },
  startChatButton: {
    backgroundColor: '#C34342',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 20,
  },

  startChatButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // List
  listContainer: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  listIconWrapper: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTextWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  listSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 76,
  },
});

export default HelpScreen;
