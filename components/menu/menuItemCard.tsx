import Ionicons from '@expo/vector-icons/Ionicons';

import {
  ActivityIndicator,
  Image,
  Pressable,
  Switch,
  Text,
  View,
} from 'react-native';

type Props = {
  title: string;
  description: string;
  price: string;
  imageUrl: string | null;
  status: boolean;
  category: string;
  loading?: boolean;
  handleToggle: () => void;
  onPressEdit?: () => void;
};

export default function MenuItemCard({
  title,
  description,
  price,
  imageUrl,
  status,
  category,
  loading = false,
  handleToggle,
  onPressEdit,
}: Props) {
  return (
    <View
      className="
                bg-light border border-black/5
                rounded-3xl overflow-hidden mb-5
            "
    >
      <View className="relative">
        {imageUrl ? (
          <Image
            source={{
              uri: imageUrl,
            }}
            className="w-full h-48"
            resizeMode="cover"
          />
        ) : (
          <View
            className="
                            w-full h-24
                            bg-primary/5
                            items-center justify-center
                            gap-3
                        "
          >
            <Ionicons name="image-outline" size={32} color="#C34342" />
            <Text className="text-primary font-semibold">Sem imagem</Text>
          </View>
        )}

        <View
          className={`
                        absolute top-4 right-4
                        px-3 py-2 rounded-full
                        ${status ? 'bg-emerald-500' : 'bg-gray-400'}
                    `}
        >
          <Text className="text-light text-xs font-bold">
            {status ? 'Disponível' : 'Oculto'}
          </Text>
        </View>
      </View>

      <View className="p-5 gap-2">
        <View className="self-start px-3 py-1 rounded-full bg-primary/10">
          <Text className="text-primary text-xs font-semibold capitalize">
            {category}
          </Text>
        </View>

        <View className="gap-2">
          <Text className="text-2xl font-bold text-dark">{title}</Text>

          <Text className="text-sm leading-6 text-black/60">{description}</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-black/50">Preço</Text>

            <Text className="text-2xl font-bold text-primary">R$ {price}</Text>
          </View>

          <View className="items-center gap-2 min-w-[70px]">
            {loading ? (
              <ActivityIndicator size="small" color="#C34342" />
            ) : (
              <Switch
                value={status}
                onValueChange={handleToggle}
                trackColor={{
                  false: '#D1D5DB',
                  true: '#86EFAC',
                }}
                thumbColor={status ? '#16A34A' : '#9CA3AF'}
              />
            )}

            <Text className="text-xs text-black/50">
              {loading ? 'Alterando...' : status ? 'Visível' : 'Escondido'}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={onPressEdit}
          className="
                        bg-primary rounded-2xl
                        py-4 flex-row
                        items-center justify-center
                        gap-2
                    "
        >
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />

          <Text className="text-light font-bold text-base">Editar item</Text>
        </Pressable>
      </View>
    </View>
  );
}
