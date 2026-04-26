import { Header } from '@/components/general/header';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FAQItem = {
  id: number;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const HelpScreen: React.FC = () => {
  const router = useRouter();

  // Sample FAQ data
  const faqItems: FAQItem[] = [
    { id: 1, title: 'Como cadastrar meu negócio', icon: 'storefront' },
    { id: 2, title: 'Dicas de fotos', icon: 'camera-alt' },
    { id: 3, title: 'Termos de uso', icon: 'description' },
    { id: 4, title: 'Formas de pagamento', icon: 'credit-card' },
  ];

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

  // Handle phone call
  const handleCallSupport = async () => {
    const phoneNumber =
      Platform.OS === 'ios' ? 'telprompt:08001234567' : 'tel:08001234567';

    try {
      const canOpen = await Linking.canOpenURL(phoneNumber);
      if (canOpen) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert('Erro', 'Não foi possível realizar a chamada.');
      }
    } catch {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar ligar para o suporte.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Standard Fixed Header - Adjusted padding */}
      <View style={styles.headerWrapper}>
        <Header
          title="Central de Ajuda"
          showBackButton
          showNotificationButton={false}
          onBackPress={() => router.back()}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>

          <View style={styles.buttonContainer}>
            {faqItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => router.push('/helpDetail')} // Final route path
                style={styles.faqCard}
              >
                <MaterialIcons name={item.icon} size={24} color="#C34342" />
                <Text style={styles.faqTitle}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#CBD5E0" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contato</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSendEmail}
              style={styles.emailButton}
            >
              <MaterialIcons name="email" size={24} color="#fff" />
              <Text style={styles.contactButtonText}>Enviar E-mail</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCallSupport}
              style={styles.phoneButton}
            >
              <MaterialIcons name="phone" size={24} color="#fff" />
              <Text style={styles.contactButtonText}>Ligar para Suporte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#A0AEC0',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  faqCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  faqTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: 14,
  },
  contactSection: {
    marginTop: 10,
  },
  buttonContainer: {
    gap: 12,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C34342',
    borderRadius: 16,
    paddingVertical: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#C34342',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A202C',
    borderRadius: 16,
    paddingVertical: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
});

export default HelpScreen;
