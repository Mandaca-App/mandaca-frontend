import Ionicons from '@expo/vector-icons/Ionicons';

import { Pressable, ScrollView, Text, View } from 'react-native';

type Category =
  | 'todos'
  | 'entrada'
  | 'principal'
  | 'sobremesa'
  | 'acompanhamento'
  | 'bebida';

type Props = {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
};

const categories = [
  {
    label: 'Todos',
    value: 'todos',
    icon: 'grid-outline',
  },
  {
    label: 'Entradas',
    value: 'entrada',
    icon: 'restaurant-outline',
  },
  {
    label: 'Principais',
    value: 'principal',
    icon: 'fast-food-outline',
  },
  {
    label: 'Sobremesas',
    value: 'sobremesa',
    icon: 'ice-cream-outline',
  },
  {
    label: 'Acompanhamentos',
    value: 'acompanhamento',
    icon: 'nutrition-outline',
  },
  {
    label: 'Bebidas',
    value: 'bebida',
    icon: 'wine-outline',
  },
] as const;

export default function MenuCategoryFilter({
  selectedCategory,
  onSelectCategory,
}: Props) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 4,
        }}
      >
        {categories.map((item) => {
          const isSelected = selectedCategory === item.value;

          return (
            <Pressable
              key={item.value}
              onPress={() => onSelectCategory(item.value)}
              className={`
                                flex-row items-center gap-2
                                px-5 py-3 rounded-2xl border
                                ${
                                  isSelected
                                    ? 'bg-primary border-primary'
                                    : 'bg-light border-black/10'
                                }
                            `}
            >
              <Ionicons
                name={item.icon}
                size={18}
                color={isSelected ? '#FFFFFF' : '#C34342'}
              />

              <Text
                className={`
                                    font-semibold
                                    ${isSelected ? 'text-light' : 'text-dark'}
                                `}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
