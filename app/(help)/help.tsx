import { Header } from '@/components/general/header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getContacts } from '@/services/contactService';
import { ContactResponse } from '@/types/contact';

const HelpScreen: React.FC = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactResponse[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getContacts();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  const handleOpenLink = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(url);
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir o link solicitado.');
    }
  };

  const handleStartChat = () => {
    router.push('/consultant' as any);
  };

  const handleTutorials = () => {
    router.push('/(help)/tutorials' as any);
  };

  const activeContact = contacts[0] || null;
  const whatsapp = activeContact?.whatsapp;
  const phone = activeContact?.telefone;
  const email = activeContact?.email || 'suporte@mandaca.com.br';

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
            onPress={() => setModalVisible(true)}
            style={styles.listItem}
          >
            <View style={styles.listIconWrapper}>
              <Ionicons name="mail-outline" size={28} color="#C34342" />
            </View>
            <View style={styles.listTextWrapper}>
              <Text style={styles.listTitle}>Fale Conosco</Text>
              <Text style={styles.listSubtitle}>Entre em contato conosco</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#C34342" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal/Action Sheet for Contacts */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Fale Conosco</Text>
              <Text style={styles.modalSubtitle}>
                Selecione o canal de sua preferência para falar com nossa equipe:
              </Text>
            </View>

            <View style={styles.modalButtonsContainer}>
              {whatsapp ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.modalButton, styles.whatsappButton]}
                  onPress={() => {
                    setModalVisible(false);
                    handleOpenLink(`https://wa.me/${whatsapp.replace(/\D/g, '')}`);
                  }}
                >
                  <Ionicons name="logo-whatsapp" size={24} color="#FFFFFF" />
                  <Text style={styles.modalButtonText}>Conversar no WhatsApp</Text>
                </TouchableOpacity>
              ) : null}

              {phone ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.modalButton, styles.phoneButton]}
                  onPress={() => {
                    setModalVisible(false);
                    handleOpenLink(`tel:${phone.replace(/\D/g, '')}`);
                  }}
                >
                  <Ionicons name="call-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.modalButtonText}>Ligar por Telefone</Text>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.modalButton, styles.emailButton]}
                onPress={() => {
                  setModalVisible(false);
                  const subject = encodeURIComponent('Suporte - Central de Ajuda Mandacá');
                  handleOpenLink(`mailto:${email}?subject=${subject}`);
                }}
              >
                <Ionicons name="mail-outline" size={24} color="#FFFFFF" />
                <Text style={styles.modalButtonText}>Enviar E-mail</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalCancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalButtonsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  phoneButton: {
    backgroundColor: '#007AFF',
  },
  emailButton: {
    backgroundColor: '#C34342',
  },
  modalCancelButton: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  modalCancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HelpScreen;
