import { StyleSheet, Text, View } from 'react-native';
import { sentimentConfig } from '../../../constants/theme';
import { ReviewSentiment } from '../../../types/reviewSentiment';

interface ReviewCardProps {
  name: string;
  sentiment: ReviewSentiment;
  comment: string;
  createdAt?: string;
}

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

const formatReviewDate = (value?: string): string | null => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export const ReviewCard = ({
  name,
  sentiment,
  comment,
  createdAt,
}: ReviewCardProps) => {
  const config = sentimentConfig[sentiment];
  const displayName = getSimpleName(name);
  const formattedDate = formatReviewDate(createdAt);

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
          className="rounded-full justify-center items-center w-20 h-6"
          style={{ backgroundColor: config.bgColor }}
        >
          <Text
            className="font-medium leading-4 text-sm"
            style={{ color: config.textColor }}
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

      {formattedDate ? (
        <Text className="mt-3 text-dark/70 text-xs leading-4">
          {formattedDate}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: 176,
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
