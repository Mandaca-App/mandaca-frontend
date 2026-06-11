import Ionicons from '@expo/vector-icons/Ionicons';

import { router, useLocalSearchParams } from 'expo-router';

import { useMemo, useState } from 'react';

import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';

import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';

import { createMenuBulk } from '@/services/menu';

type ScannedItem = {
    descricao: string;
    historia: string;
    preco: string;
    categoria:
        | 'entrada'
        | 'prato_principal'
        | 'sobremesa'
        | 'bebida'
        | 'lanche';
};

export default function ReviewScanScreen() {
    const { items } =
        useLocalSearchParams();

    const [loading, setLoading] =
        useState(false);

    const [menuItems, setMenuItems] =
        useState<ScannedItem[]>(
            () => {
                try {
                    return JSON.parse(
                        String(items),
                    );
                } catch {
                    return [];
                }
            },
        );

    const enterpriseId =
        'caa68f64-b68e-4327-90f0-264ca1bb73e2';

    const handleDelete =
        (index: number) => {
            setMenuItems((prev) =>
                prev.filter(
                    (_, itemIndex) =>
                        itemIndex !==
                        index,
                ),
            );
        };

    const handleEdit =
        (
            item: ScannedItem,
            index: number,
        ) => {
            router.push({
                pathname:
                    '/(mybusiness)/menu/form',
                params: {
                    mode: 'create',

                    descricao:
                        item.descricao,

                    historia:
                        item.historia,

                    preco:
                        item.preco,

                    categoria:
                        item.categoria,

                    reviewIndex:
                        index,
                },
            });
        };

    const handleSave =
        async () => {
            try {
                setLoading(true);

                await createMenuBulk(
                    enterpriseId,
                    menuItems,
                );

                Alert.alert(
                    'Sucesso',
                    'Cardápio criado com sucesso!',
                );

                router.replace(
                    '/(mybusiness)/menu/menu',
                );
            } catch (error) {
                console.error(
                    error,
                );

                Alert.alert(
                    'Erro',
                    'Não foi possível salvar os itens.',
                );
            } finally {
                setLoading(false);
            }
        };

    const totalItems =
        useMemo(
            () =>
                menuItems.length,
            [menuItems],
        );

    return (
        <Container>
            <Header
                title="Revisar Cardápio"
                showBackButton
            />

            <ScrollView
                className="mt-5"
                showsVerticalScrollIndicator={
                    false
                }
            >
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-dark">
                        Revisão dos itens
                    </Text>

                    <Text className="text-black/60 mt-2 leading-6">
                        Revise os itens
                        encontrados pela
                        inteligência
                        artificial antes de
                        adicioná-los ao seu
                        cardápio.
                    </Text>
                </View>

                <View
                    className="
                        bg-primary/10
                        rounded-2xl
                        px-4 py-3
                        mb-6
                    "
                >
                    <Text className="font-semibold text-primary">
                        {totalItems}{' '}
                        {totalItems === 1
                            ? 'item encontrado'
                            : 'itens encontrados'}
                    </Text>
                </View>

                {menuItems.map(
                    (
                        item,
                        index,
                    ) => (
                        <View
                            key={`${item.descricao}-${index}`}
                            className="
                                bg-light
                                border border-black/10
                                rounded-3xl
                                p-5
                                mb-4
                            "
                        >
                            <View className="gap-2">
                                <Text className="text-xl font-bold text-dark">
                                    {
                                        item.descricao
                                    }
                                </Text>

                                <Text className="text-black/60 leading-6">
                                    {
                                        item.historia
                                    }
                                </Text>
                            </View>

                            <View className="flex-row items-center justify-between mt-5">
                                <View>
                                    <Text className="text-xs text-black/50">
                                        Preço
                                    </Text>

                                    <Text className="text-primary text-xl font-bold">
                                        R${' '}
                                        {
                                            item.preco
                                        }
                                    </Text>
                                </View>

                                <View className="bg-primary/10 px-3 py-2 rounded-full">
                                    <Text className="text-primary font-semibold capitalize">
                                        {item.categoria ===
                                        'prato_principal'
                                            ? 'Prato Principal'
                                            : item.categoria}
                                    </Text>
                                </View>
                            </View>

                            <View className="flex-row gap-3 mt-5">
                                <Pressable
                                    onPress={() =>
                                        handleEdit(
                                            item,
                                            index,
                                        )
                                    }
                                    className="
                                        flex-1
                                        bg-primary
                                        rounded-2xl
                                        py-4
                                        flex-row
                                        items-center
                                        justify-center
                                        gap-2
                                    "
                                >
                                    <Ionicons
                                        name="create-outline"
                                        size={
                                            18
                                        }
                                        color="#FFF"
                                    />

                                    <Text className="text-light font-bold">
                                        Editar
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() =>
                                        handleDelete(
                                            index,
                                        )
                                    }
                                    className="
                                        flex-1
                                        bg-red-500
                                        rounded-2xl
                                        py-4
                                        flex-row
                                        items-center
                                        justify-center
                                        gap-2
                                    "
                                >
                                    <Ionicons
                                        name="trash-outline"
                                        size={
                                            18
                                        }
                                        color="#FFF"
                                    />

                                    <Text className="text-light font-bold">
                                        Excluir
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    ),
                )}

                <Pressable
                    disabled={
                        loading ||
                        totalItems ===
                            0
                    }
                    onPress={
                        handleSave
                    }
                    className="
                        bg-primary
                        rounded-2xl
                        py-5
                        mb-10
                        mt-2
                        items-center
                        justify-center
                    "
                >
                    {loading ? (
                        <ActivityIndicator
                            color="#FFF"
                        />
                    ) : (
                        <Text className="text-light font-bold text-lg">
                            Salvar no Cardápio
                        </Text>
                    )}
                </Pressable>
            </ScrollView>
        </Container>
    );
}