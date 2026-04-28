import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type ReviewFilterType =
  | 'todos'
  | 'elogios'
  | 'dicas'
  | 'duvidas';

interface ReviewsFilterNavProps {
  onFilterChange: (filter: ReviewFilterType) => void;
  initialFilter?: ReviewFilterType;
}

const FILTER_OPTIONS: { id: ReviewFilterType; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'elogios', label: 'Elogios' },
  { id: 'dicas', label: 'Dicas' },
  { id: 'duvidas', label: 'Dúvidas' },
];

export const ReviewsFilterNav = ({
  onFilterChange,
  initialFilter = 'todos',
}: ReviewsFilterNavProps) => {
  const [activeFilter, setActiveFilter] =
    useState<ReviewFilterType>(initialFilter);

  const handleFilterPress = (filterId: ReviewFilterType) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <View className="flex-row flex-wrap justify-center items-center gap-3 px-4 py-4">
      {FILTER_OPTIONS.map((filter) => (
        <Pressable
          key={filter.id}
          onPress={() => handleFilterPress(filter.id)}
          className={`h-10 rounded-lg justify-center items-center px-4 ${
            activeFilter === filter.id
              ? 'bg-primary'
              : 'bg-light border border-secondary'
          }`}
          style={[
            styles.filterButton,
            activeFilter === filter.id
              ? styles.filterButtonActive
              : styles.filterButtonInactive,
          ]}
        >
          <Text
            className={`text-base font-bold ${
              activeFilter === filter.id ? 'text-light' : 'text-dark'
            }`}
          >
            {filter.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    minWidth: 88,
  },
  filterButtonActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  filterButtonInactive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});