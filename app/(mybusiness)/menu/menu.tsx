import {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';

import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';

import {
    getMenuByEnterprise,
    MenuItem,
} from '@/services/menu';

import { router } from 'expo-router';

import MenuItems from '@/components/menu/menuItens';
import MenuCategoryFilter from './categoryFilter';

type Category =
    | 'todos'
    | 'entrada'
    | 'principal'
    | 'sobremesa'
    | 'acompanhamento'
    | 'bebida';

export default function MenuList() {
    const [menu, setMenu] =
        useState<MenuItem[]>([]);

    const [selectedCategory, setSelectedCategory] =
        useState<Category>('todos');

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

            <MenuItems
                items={filteredMenu}
                reloadMenu={loadMenu}
            />
        </Container>
    );
}