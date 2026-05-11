import { Header } from '@/components/general/header';
import { ReviewCard } from '@/components/MyBusiness/reviewCard/main';
import {
  ReviewsFilterNav,
  type ReviewFilterType,
} from '@/components/MyBusiness/reviewsFilter/main';
import { useAssessments } from '@/hooks/useAssessments';
import { Assessment } from '@/services/assessmentService';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

type ReviewSentiment = 'elogios' | 'dicas' | 'duvidas';

interface ReviewItem {
  id: string;
  name: string;
  sentiment: ReviewSentiment;
  comment: string;
  createdAt?: string;
}

const mapSentiment = (tipo: string | number): ReviewSentiment => {
  const tipoStr = String(tipo).toLowerCase();

  if (tipoStr === '0' || tipoStr === 'positiva') return 'elogios';
  if (tipoStr === '1' || tipoStr === 'negativa') return 'dicas';
  if (tipoStr === '2' || tipoStr === 'neutra') return 'duvidas';

  return 'duvidas';
};

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState<ReviewFilterType>('todos');

  const {
    assessments,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = useAssessments(ENTERPRISE_ID);

  const reviews: ReviewItem[] = useMemo(
    () =>
      assessments.map((assessment: Assessment) => ({
        id: assessment.id_avaliacao,
        name: assessment.usuario_nome || 'Anônimo',
        sentiment: mapSentiment(assessment.tipo_avaliacao),
        comment: assessment.texto,
        createdAt: assessment.created_at,
      })),
    [assessments],
  );

  const filteredReviews = useMemo(
    () =>
      activeFilter === 'todos'
        ? reviews
        : reviews.filter((review) => review.sentiment === activeFilter),
    [activeFilter, reviews],
  );

  const renderReview = ({ item }: { item: ReviewItem }) => (
    <ReviewCard
      name={item.name}
      sentiment={item.sentiment}
      comment={item.comment}
      createdAt={item.createdAt}
    />
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View className="py-4 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View className="flex-1 items-center justify-center py-12">
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (error) {
      return (
        <View className="flex-1 items-center justify-center py-12">
          <Text className="text-dark text-center text-sm">{error}</Text>
        </View>
      );
    }
    return (
      <View className="flex-1 items-center justify-center py-12">
        <Text className="text-dark text-center text-sm">
          Nenhuma avaliação encontrada nesta categoria.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-8 py-5 gap-4 flex-1">
        <Header title="Avaliações" showBackButton showNotificationButton />
        <ReviewsFilterNav
          initialFilter="todos"
          onFilterChange={setActiveFilter}
        />

        <FlatList
          data={filteredReviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id}
          onEndReached={() => {
            if (hasMore && !loadingMore) {
              loadMore();
            }
          }}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}
