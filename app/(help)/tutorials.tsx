import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Header } from '@/components/general/header';
import { getTutorials } from '@/services/tutorialService';
import { Tutorial, CategoriaTutorial } from '@/types/tutorial';

interface CategoryTab {
  id: CategoriaTutorial | 'todos';
  label: string;
  icon: keyof typeof Ionicons.prototype.props.name;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: 'todos', label: 'Todos', icon: 'apps-outline' },
  { id: 'geral', label: 'Geral', icon: 'information-circle-outline' },
  { id: 'cardapio', label: 'Cardápio', icon: 'restaurant-outline' },
  { id: 'reserva', label: 'Reservas', icon: 'calendar-outline' },
  { id: 'relatorios', label: 'Relatórios', icon: 'analytics-outline' },
];

const TutorialsScreen: React.FC = () => {
  const router = useRouter();
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoriaTutorial | 'todos'
  >('todos');

  const fetchTutorials = async () => {
    setLoading(true);
    try {
      const catParam =
        selectedCategory === 'todos' ? undefined : selectedCategory;
      const data = await getTutorials(catParam);
      // Sort by the 'ordem' field
      const sorted = data.sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
      setTutorials(sorted.filter((t) => t.ativo));
    } catch (error) {
      console.error('Erro ao carregar tutoriais:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, [selectedCategory]);

  const handleOpenTutorial = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        // Fallback or alert if URL can't be opened directly
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Não foi possível abrir o tutorial:', error);
    }
  };

  const getCategoryIcon = (category: CategoriaTutorial) => {
    switch (category) {
      case 'cardapio':
        return 'restaurant-outline';
      case 'reserva':
        return 'calendar-outline';
      case 'relatorios':
        return 'analytics-outline';
      case 'geral':
      default:
        return 'information-circle-outline';
    }
  };

  const getCategoryColor = (category: CategoriaTutorial) => {
    switch (category) {
      case 'cardapio':
        return '#FF9500'; // Orange
      case 'reserva':
        return '#007AFF'; // Blue
      case 'relatorios':
        return '#34C759'; // Green
      case 'geral':
      default:
        return '#C34342'; // Mandacá primary red
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Header
          title="Tutoriais"
          showBackButton
          showNotificationButton={false}
          onBackPress={() => router.back()}
        />
      </View>

      {/* Categories Horizontal Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(tab.id)}
                style={[styles.tabButton, isSelected && styles.tabButtonActive]}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={16}
                  color={isSelected ? '#FFFFFF' : '#6B7280'}
                  style={styles.tabIcon}
                />
                <Text
                  style={[styles.tabLabel, isSelected && styles.tabLabelActive]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#C34342" />
          <Text style={styles.loadingText}>Carregando tutoriais...</Text>
        </View>
      ) : tutorials.length === 0 ? (
        <View style={styles.centerContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="journal-outline" size={48} color="#9CA3AF" />
          </View>
          <Text style={styles.emptyTitle}>Nenhum tutorial encontrado</Text>
          <Text style={styles.emptySubtitle}>
            Não há tutoriais disponíveis para esta categoria no momento.
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {tutorials.map((tutorial) => {
            const iconColor = getCategoryColor(tutorial.categoria);
            return (
              <TouchableOpacity
                key={tutorial.id}
                activeOpacity={0.9}
                onPress={() => handleOpenTutorial(tutorial.url)}
                style={styles.card}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: `${iconColor}12` }, // Light tint of category color
                    ]}
                  >
                    <Ionicons
                      name={getCategoryIcon(tutorial.categoria) as any}
                      size={24}
                      color={iconColor}
                    />
                  </View>
                  <View style={styles.cardHeaderTexts}>
                    <Text style={styles.categoryBadgeText}>
                      {tutorial.categoria.toUpperCase()}
                    </Text>
                    <Text style={styles.cardTitle} numberOfLines={2}>
                      {tutorial.titulo}
                    </Text>
                  </View>
                </View>

                {tutorial.descricao ? (
                  <Text style={styles.cardDescription} numberOfLines={3}>
                    {tutorial.descricao}
                  </Text>
                ) : null}

                <View style={styles.cardFooter}>
                  <Text style={[styles.actionText, { color: iconColor }]}>
                    Assistir Tutorial
                  </Text>
                  <Ionicons name="arrow-forward" size={16} color={iconColor} />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7FA',
  },
  headerWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#F8F7FA',
  },
  tabsContainer: {
    backgroundColor: '#F8F7FA',
    paddingBottom: 8,
  },
  tabsScroll: {
    paddingHorizontal: 24,
    gap: 8,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 4,
  },
  tabButtonActive: {
    backgroundColor: '#C34342',
    borderColor: '#C34342',
  },
  tabIcon: {
    marginRight: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1C',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardHeaderTexts: {
    flex: 1,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
    color: '#6B7280',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    lineHeight: 22,
  },
  cardDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginTop: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});

export default TutorialsScreen;
