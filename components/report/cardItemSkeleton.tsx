import { View } from 'react-native';

export const CardItemSkeleton = () => {
  return (
    <View className="px-10 py-8 border border-primary/30 rounded-2xl gap-6 animate-pulse">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="w-7 h-7 bg-gray-300 rounded-full" />
        <View className="w-40 h-5 bg-gray-300 rounded-md" />
        <View className="w-5 h-5 bg-gray-300 rounded-full" />
      </View>

      {/* Topics */}
      {[1, 2, 3].map((_, index) => (
        <View key={index} className="flex-row items-center gap-4">
          <View className="w-6 h-1 bg-gray-300 rounded-full" />
          <View className="flex-1 h-4 bg-gray-300 rounded-md" />
        </View>
      ))}

      {/* Button */}
      <View className="h-10 bg-gray-300 rounded-xl" />
    </View>
  );
};
