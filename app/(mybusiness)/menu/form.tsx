// app/(mybusiness)/menuFormScreen.tsx

import {
    router,
    useLocalSearchParams,
} from 'expo-router';

import {
    useEffect,
    useState,
} from 'react';

import {
    ActivityIndicator,
    Alert,
    View,
} from 'react-native';

import { Container } from '@/components/general/container';

import { Header } from '@/components/general/header';

import MenuForm from '@/components/menu/menuForm';

import {
    getMenuById,
} from '@/services/menu';

export default function MenuFormScreen() {
    const {
        id,
        mode,
    } = useLocalSearchParams();

    const [loading, setLoading] =
        useState(false);

    const [initialData, setInitialData] =
        useState<any>(null);

    const isEditing =
        mode === 'edit';

    useEffect(() => {
        const loadItem =
            async () => {
                if (!id) {
                    return;
                }

                try {
                    setLoading(true);

                    const data =
                        await getMenuById(
                            String(id),
                        );

                    setInitialData({
                        descricao:
                            data?.descricao ??
                            '',

                        descricaoCurta:
                            data?.descricao ??
                            '',

                        historia:
                            data?.historia ??
                            '',

                        preco:
                            data?.preco ??
                            '',

                        categoria:
                            data?.categoria ??
                            'prato_principal',

                        foto:
                            data?.url_foto_item ??
                            null,
                    });
                } catch (error) {
                    console.error(error);

                    Alert.alert(
                        'Erro',
                        'Não foi possível carregar o item.',
                    );

                    router.back();
                } finally {
                    setLoading(false);
                }
            };

        loadItem();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator
                    size="large"
                    color="#C34342"
                />
            </View>
        );
    }

    return (
        <Container>
            <Header
                title={
                    isEditing
                        ? 'Editar prato'
                        : 'Novo prato'
                }
                showBackButton
            />

            <MenuForm
                initialData={initialData}
                isEditing={isEditing}
                menuId={
                    id
                        ? String(id)
                        : undefined
                }
            />
        </Container>
    );
}