import {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    ActivityIndicator,
    Pressable,
    Text,
    View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { router } from 'expo-router';

import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';

import MenuItems from '@/components/menu/menuItens';

import {
    getMenuByEnterprise,
    MenuItem,
} from '@/services/menu';

import MenuCategoryFilter from './categoryFilter';

type Category =
    | 'todos'
    | 'entrada'
    | 'prato_principal'
    | 'sobremesa'
    | 'lanche'
    | 'bebida';

export default function MenuList() {
    const [menu, setMenu] =
        useState<MenuItem[]>([]);

    const [
        selectedCategory,
        setSelectedCategory,
    ] = useState<Category>(
        'todos',
    );

    const [loading, setLoading] =
        useState(true);

    const enterpriseId =
        'caa68f64-b68e-4327-90f0-264ca1bb73e2';

    const loadMenu = async () => {
        try {
            const data =
                await getMenuByEnterprise(
                    enterpriseId,
                );

            setMenu(data);
        } catch (error) {
            console.error(
                'Erro ao buscar cardápio:',
                error,
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMenu();
    }, []);

    const filteredMenu =
        useMemo(() => {
            if (
                selectedCategory ===
                'todos'
            ) {
                return menu;
            }

            return menu.filter(
                (item) =>
                    item.categoria ===
                    selectedCategory,
            );
        }, [
            menu,
            selectedCategory,
        ]);

    if (loading) {
        return (
            <Container>
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator
                        size="large"
                        color="#C34342"
                    />

                    <Text className="mt-5 text-base font-medium text-black/60">
                        Carregando cardápio...
                    </Text>
                </View>
            </Container>
        );
    }

    return (
        <Container>
            <Header
                title="Meu Cardápio"
                showBackButton
                showNotificationButton
                onBackPress={() =>
                    router.navigate(
                        '/(mybusiness)/myBusiness',
                    )
                }
            />

            <MenuCategoryFilter
                selectedCategory={
                    selectedCategory
                }
                onSelectCategory={
                    setSelectedCategory
                }
            />

            <Pressable
                onPress={() =>
                    router.navigate({
                        pathname:
                            '/(mybusiness)/menu/form',
                        params: {
                            mode: 'create',
                        },
                    })
                }
                className="
                    bg-primary rounded-2xl
                    py-4 mt-5 mb-2
                    flex-row items-center justify-center
                    gap-2
                "
            >
                <Ionicons
                    name="add-circle-outline"
                    size={22}
                    color="#FFFFFF"
                />

                <Text className="text-light font-bold text-base">
                    Adicionar item
                </Text>
            </Pressable>

            <MenuItems
                items={filteredMenu}
                reloadMenu={loadMenu}
            />
        </Container>
    );
}