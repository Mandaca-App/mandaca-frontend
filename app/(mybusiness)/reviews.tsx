import { useState } from 'react';
import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import {
  ReviewsFilterNav,
  type ReviewFilterType,
} from '@/components/MyBusiness/reviewsFilter/main';
import { ReviewCard } from '@/components/MyBusiness/reviewCard/main';
import { MOCK_REVIEWS } from '@/components/MyBusiness/reviewCard/mock';
import { View, Text } from 'react-native';

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState<ReviewFilterType>('todos');

  // requisicao do backend para pegar as reviews, por enquanto usando mock
  const reviews = MOCK_REVIEWS;

  const filteredReviews =
    activeFilter === 'todos'
      ? reviews
      : reviews.filter((review) => review.sentiment === activeFilter);

  const handleFilterChange = (filter: ReviewFilterType) => {
    setActiveFilter(filter);
  };

  return (
    <Container>
      <Header title="Avaliações" showBackButton showNotificationButton />
      <View className="gap-4">
        <ReviewsFilterNav
          initialFilter="todos"
          onFilterChange={handleFilterChange}
        />

        {filteredReviews.length > 0 ? (
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
