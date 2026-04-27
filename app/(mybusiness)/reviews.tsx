import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { ReviewCard } from '@/components/MyBusiness/reviewCard/main';
import {
  ReviewsFilterNav,
  type ReviewFilterType,
} from '@/components/MyBusiness/reviewsFilter/main';
import { useAssessments } from '@/hooks/useAssessments';
import { Assessment } from '@/services/assessmentService';
import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

// 🔥 tipo único e consistente
type ReviewSentiment = 'elogios' | 'dicas' | 'duvidas';

interface ReviewItem {
  id: string;
  name: string;
  sentiment: ReviewSentiment;
  comment: string;
}

// 🔥 mapper API → UI
const mapSentiment = (tipo: string): ReviewSentiment => {
  switch (tipo) {
    case 'positiva':
      return 'elogios';
    case 'negativa':
      return 'dicas';
    case 'neutra':
      return 'duvidas';
    default:
      return 'duvidas';
  }
};

export default function Reviews() {
  const [activeFilter, setActiveFilter] =
    useState<ReviewFilterType>('todos');

  const { assessments, loading, error } =
    useAssessments(ENTERPRISE_ID);

  const reviews: ReviewItem[] = assessments.map(
    (assessment: Assessment) => ({
      id: assessment.id_avaliacao,
      name: assessment.usuario_nome || 'Anônimo',
      sentiment: mapSentiment(assessment.tipo_avaliacao),
      comment: assessment.texto,
    }),
  );

  const filteredReviews =
    activeFilter === 'todos'
      ? reviews
      : reviews.filter(
          (review) => review.sentiment === activeFilter,
        );

  return (
    <Container>
      <Header title="Avaliações" showBackButton showNotificationButton />

      <View className="gap-4">
        <ReviewsFilterNav
          initialFilter="todos"
          onFilterChange={setActiveFilter}
        />

        {loading ? (
          <View className="items-center justify-center py-12">
            <ActivityIndicator size="large" />
          </View>
        ) : error ? (
          <View className="items-center justify-center py-12">
            <Text className="text-dark text-center text-sm">
              {error}
            </Text>
          </View>
        ) : filteredReviews.length > 0 ? (
          <View className="gap-4">
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                sentiment={review.sentiment}
                comment={review.comment}
              />
            ))}
          </View>
        ) : (
          <View className="items-center justify-center py-12">
            <Text className="text-dark text-center text-sm">
              Nenhuma avaliação encontrada nesta categoria.
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
}