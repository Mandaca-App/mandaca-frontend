import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dados temporários para exemplo
const MOCK_RESERVATIONS: ReservationCard[] = [
  {
    id: '1',
    clientName: 'João Silva',
    clientImage: 'https://via.placeholder.com/48',
    date: '12/09',
    time: '20:00',
    guests: 4,
    status: 'confirmada',
  },
  {
    id: '2',
    clientName: 'Maria Santos',
    clientImage: 'https://via.placeholder.com/48',
    date: '13/09',
    time: '19:30',
    guests: 2,
    status: 'confirmada',
  },
  {
    id: '3',
    clientName: 'Pedro Costa',
    clientImage: 'https://via.placeholder.com/48',
    date: '14/09',
    time: '21:00',
    guests: 6,
    status: 'aguardando',
  },
];

interface ReservationCard {
  id: string;
  clientName: string;
  clientImage: string;
  date: string;
  time: string;
  guests: number;
  status: 'confirmada' | 'aguardando';
}

const ReservationCardComponent = ({
  reservation,
  onChatPress,
}: {
  reservation: ReservationCard;
  onChatPress: (reservationId: string, clientName: string) => void;
}) => {
  const statusColor =
    reservation.status === 'confirmada' ? '#10B981' : '#F59E0B';

  return (
    <View className="mx-4 mb-4 rounded-lg border border-gray-200 bg-white p-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-3 flex-1">
          <Image
            source={{ uri: reservation.clientImage }}
            className="w-12 h-12 rounded-full"
          />
          <View>
            <Text className="font-semibold text-gray-900">
              {reservation.clientName}
            </Text>
            <Text className="text-sm text-gray-500">
              {reservation.guests} hóspede{reservation.guests > 1 ? 's' : ''}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => onChatPress(reservation.id, reservation.clientName)}
          className="bg-blue-50 p-2.5 rounded-full"
        >
          <Ionicons name="chatbubble-outline" size={18} color="#3B82F6" />
        </Pressable>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1">
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600">{reservation.date}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600">{reservation.time}</Text>
          </View>
        </View>
        <View
          className="px-2.5 py-1 rounded-full"
          style={{ backgroundColor: statusColor + '20' }}
        >
          <Text className="text-xs font-medium" style={{ color: statusColor }}>
            {reservation.status === 'confirmada' ? 'Confirmada' : 'Aguardando'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function Reservations() {
  const handleChatPress = (reservationId: string, clientName: string) => {
    router.push({
      pathname: '/(mybusiness)/(reservations)/chat' as any,
      params: {
        reservationId,
        clientName,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900">Reservas</Text>
        </View>

        {/* Tabs */}
        <View className="flex-row bg-white border-b border-gray-200 px-4">
          <Pressable className="flex-1 py-3 border-b-2 border-red-600">
            <Text className="text-center font-semibold text-red-600">
              Confirmadas
            </Text>
          </Pressable>
          <Pressable className="flex-1 py-3 border-b border-gray-200">
            <Text className="text-center font-semibold text-gray-400">
              Aguardando
            </Text>
          </Pressable>
        </View>

        {/* Reservations List */}
        <FlatList
          data={MOCK_RESERVATIONS.filter((r) => r.status === 'confirmada')}
          renderItem={({ item }) => (
            <ReservationCardComponent
              reservation={item}
              onChatPress={handleChatPress}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
