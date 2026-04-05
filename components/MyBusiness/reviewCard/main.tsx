import { View, Text, StyleSheet } from 'react-native';

export type ReviewSentiment = 'elogios' | 'dicas' | 'duvidas';

interface ReviewCardProps {
  name: string;
  sentiment: ReviewSentiment;
  comment: string;
}

const SENTIMENT_CONFIG = {
  elogios: {
    label: 'Elogio',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-700',
  },
  dicas: {
    label: 'Dicas',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-600',
  },
  duvidas: {
    label: 'Dúvidas',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-700',
  },
};

const getSimpleName = (fullName: string): string => {
  const parts = fullName.trim().split(' ');
  if (parts.length === 1) return parts[0];

  let firstName = parts[0];
  let lastName = '';

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];

    if (!lastName) {
      lastName = part;
    } else {
      const lastWord = lastName.split(' ').pop() || '';
      if (lastWord.length <= 2) {
        lastName = `${lastName} ${part}`;
      } else {
        break;
      }
    }
  }

  return `${firstName} ${lastName}`.trim();
};

export const ReviewCard = ({ name, sentiment, comment }: ReviewCardProps) => {
  const config = SENTIMENT_CONFIG[sentiment];
  const displayName = getSimpleName(name);

  return (
    <View className="bg-light rounded-2xl p-4" style={styles.cardContainer}>
      <View className="flex-row items-center justify-between mb-2">
        <Text
          className="text-dark text-base font-bold leading-6"
          numberOfLines={1}
        >
          {displayName}
        </Text>

        <View
          className={`${config.bgClass} rounded-full justify-center items-center w-20 h-6`}
        >
          <Text
            className={`${config.textClass} font-medium leading-4 text-sm`}
            numberOfLines={1}
          >
            {config.label}
          </Text>
        </View>
      </View>

      <Text
        className="text-dark font-normal text-sm leading-5"
        numberOfLines={3}
      >
        {`"${comment}"`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 152,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});
