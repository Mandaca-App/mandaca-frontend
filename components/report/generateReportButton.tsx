import { ActivityIndicator, Pressable, Text } from 'react-native';

type Props = {
  label: string;
  handlePress: () => void;
  loading?: boolean;
};

export const GenerateReportButton = ({
  label,
  handlePress,
  loading = false,
}: Props) => {
  return (
    <Pressable
      disabled={loading}
      onPress={handlePress}
      className={`px-4 py-4 bg-primary rounded-xl 
                justify-center items-center flex-row gap-2 ${
                  loading ? 'opacity-70' : 'opacity-100'
                }`}
    >
      {loading && <ActivityIndicator size="small" color="#FFFFFF" />}

      <Text className="text-light text-lg font-semibold">
        {loading ? 'Gerando relatório...' : label}
      </Text>
    </Pressable>
  );
};
