import { Header } from '@/components/general/header';
import { ReviewCard } from '@/components/MyBusiness/reviewCard/main';
import {
  ReviewsFilterNav,
  type ReviewFilterType,
} from '@/components/MyBusiness/reviewsFilter/main';
import { useAssessments } from '@/hooks/useAssessments';
import { Assessment } from '@/services/assessmentService';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

type ReviewSentiment = 'elogios' | 'dicas' | 'duvidas';

interface ReviewItem {
  id: string;
  name: string;
  sentiment: ReviewSentiment;
  comment: string;
}

const mapSentiment = (tipo: number): ReviewSentiment => {
  switch (tipo) {
    case 0:
      return 'elogios'; // POSITIVA
    case 1:
      return 'dicas';   // NEGATIVA
    case 3:
      return 'dicas';   // SUGESTAO
    case 4:
      return 'duvidas'; // DUVIDA
    default:
      return 'duvidas'; // NEUTRA (2) e demais
  }
};

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState<ReviewFilterType>('todos');

  const { assessments, loading, loadingMore, hasMore, error, loadMore } =
    useAssessments(ENTERPRISE_ID);

  const reviews: ReviewItem[] = assessments.map((assessment: Assessment) => ({
    id: assessment.id_avaliacao,
    name: assessment.usuario_nome || 'Anônimo',
    sentiment: mapSentiment(assessment.tipo_avaliacao),
    comment: assessment.texto,
  }));

  const filteredReviews =
    activeFilter === 'todos'
      ? reviews
      : reviews.filter((review) => review.sentiment === activeFilter);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={filteredReviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
        onEndReached={hasMore ? loadMore : undefined}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={
          <View className="gap-4">
            <Header title="Avaliações" showBackButton showNotificationButton />
            <ReviewsFilterNav
              initialFilter="todos"
              onFilterChange={setActiveFilter}
            />
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View className="items-center justify-center py-12">
              <ActivityIndicator size="large" />
            </View>
          ) : error ? (
            <View className="items-center justify-center py-12">
              <Text className="text-dark text-center text-sm">{error}</Text>
            </View>
          ) : (
            <View className="items-center justify-center py-12">
              <Text className="text-dark text-center text-sm">
                Nenhuma avaliação encontrada nesta categoria.
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          loadingMore ? (
            <View className="items-center py-4">
              <ActivityIndicator size="small" color="#C34342" />
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <ReviewCard
            name={item.name}
            sentiment={item.sentiment}
            comment={item.comment}
          />
        )}
      />
    </SafeAreaView>
  );
}
