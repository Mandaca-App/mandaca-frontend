import { Header } from '@/components/general/header';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Screen: FaqDetailScreen
 * Focused on high readability and premium UI for FAQ content.
 */
const FaqDetailScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Standard Header with standard back button logic */}
      <View style={styles.headerWrapper}>
        <Header 
          title="Dúvida" 
          showBackButton 
          showNotificationButton={false}
          onBackPress={() => router.back()}
        />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Visual Hierarchy: Icon and Centered Title */}
        <View style={styles.titleSection}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="storefront" size={40} color="#C34342" />
          </View>
          <Text style={styles.mainTitle}>Como cadastrar meu negócio</Text>
        </View>

        {/* Content Section: Focused on Readability (lineHeight: 26) */}
        <View style={styles.contentSection}>
          <Text style={styles.bodyText}>
            Para cadastrar seu negócio no Mandacá e começar a atrair turistas da região, siga este guia passo a passo:{'\n\n'}
            1. Na sua tela inicial, navegue até a seção de ferramentas e clique no card <Text style={styles.boldText}>"Minha Empresa"</Text>.{'\n\n'}
            2. Toque no botão de adição ou editar. Preencha todas as informações básicas: nome do local, descrição detalhada e o tipo de serviço que você oferece (ex: Gastronomia, Artesanato).{'\n\n'}
            3. <Text style={styles.boldText}>Fotos são fundamentais!</Text> Adicione imagens bem iluminadas da fachada e do interior para gerar confiança nos visitantes.{'\n\n'}
            4. Localização: Verifique se o ponto no mapa está correto para que o GPS leve os turistas exatamente até a sua porta.{'\n\n'}
            5. Finalize clicando em <Text style={styles.boldText}>"Salvar"</Text>. Nossa equipe analisará os dados em no máximo 24 horas para garantir a qualidade da plataforma.
          </Text>
        </View>

        {/* Tip Box (UX Enhancement) */}
        <View style={styles.tipBox}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb" size={20} color="#C34342" />
            <Text style={styles.tipTitle}>Dica de Especialista</Text>
          </View>
          <Text style={styles.tipText}>
            Negócios com descrições ricas em detalhes e que respondem rápido às avaliações tendem a aparecer no topo das buscas dos turistas!
          </Text>
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
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 60,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF0F0', // Soft primary background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A202C',
    textAlign: 'center',
    lineHeight: 32,
  },
  contentSection: {
    marginBottom: 32,
  },
  bodyText: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 26, // Defined for readability as requested
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: '700',
    color: '#2D3748',
  },
  tipBox: {
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C34342', // Standard primary color
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipText: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 22,
  },
});

export default FaqDetailScreen;
