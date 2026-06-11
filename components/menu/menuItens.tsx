import { ScrollView, Text, View } from 'react-native';

import { MenuItem, toggleMenuItemStatus } from '@/services/menu';

import { router } from 'expo-router';
import MenuItemCard from './menuItemCard';

type Props = {
  items: MenuItem[];
  reloadMenu: () => Promise<void>;
};

export default function MenuItems({ items, reloadMenu }: Props) {
  const handleToggle = async (itemId: string, currentStatus: boolean) => {
    try {
      await toggleMenuItemStatus(itemId, currentStatus);

      await reloadMenu();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

    const handleEditItem = (
        id: string,
    ) => {
        router.navigate({
            pathname:
                '/(mybusiness)/menu/form',
            params: {
                mode: 'edit',
                id,
            },
        })
    };

    if (items.length === 0) {
        return (
            <View className="mt-16 items-center justify-center px-6">
                <Text className="text-lg font-semibold text-dark">
                    Nenhum item encontrado
                </Text>

                <Text className="text-sm text-black/50 text-center mt-2">
                    Não existem pratos nessa categoria no momento.
                </Text>
            </View>
        );
    }


  return (
    <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
      {items.map((item) => (
        <MenuItemCard
          key={item.id_cardapio}
          title={item.descricao}
          description={item.historia}
          price={item.preco}
          imageUrl={item.url_foto_item}
          status={item.status}
          category={item.categoria}
          onPressEdit={() => handleEditItem(item.id_cardapio)}
          handleToggle={() => handleToggle(item.id_cardapio, item.status)}
        />
      ))}
    </ScrollView>
  );
}
