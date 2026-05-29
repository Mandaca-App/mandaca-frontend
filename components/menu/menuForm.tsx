import Ionicons from '@expo/vector-icons/Ionicons';

import * as ImagePicker from 'expo-image-picker';

import { router } from 'expo-router';

import { useState } from 'react';

import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';

import {
    createMenuItem,
    deleteMenuItem,
    updateMenuItem,
} from '@/services/menu';

import {
    MenuItemFormData,
    menuItemSchema,
} from '@/schemas/menuItemSchema';

const categories = [
    {
        label: 'Entrada',
        value: 'entrada',
    },
    {
        label: 'Prato Principal',
        value: 'prato_principal',
    },
    {
        label: 'Sobremesa',
        value: 'sobremesa',
    },
    {
        label: 'Bebida',
        value: 'bebida',
    },
    {
        label: 'Lanche',
        value: 'lanche',
    },
] as const;

type Props = {
    initialData?: Partial<MenuItemFormData>;
    isEditing?: boolean;
    menuId?: string;
    onSuccess?: () => void;
};

export default function MenuForm({
    initialData,
    isEditing = false,
    menuId,
    onSuccess,
}: Props) {
    const [saving, setSaving] =
        useState(false);

    const [deleting, setDeleting] =
        useState(false);

    const [formData, setFormData] =
        useState<MenuItemFormData>({
            descricao:
                initialData?.descricao ??
                '',

            descricaoCurta:
                initialData?.descricaoCurta ??
                '',

            historia:
                initialData?.historia ??
                '',

            preco:
                initialData?.preco ??
                '',

            categoria:
                initialData?.categoria ??
                'prato_principal',

            foto:
                initialData?.foto ??
                null,
        });

    const [errors, setErrors] =
        useState<
            Partial<
                Record<
                    keyof MenuItemFormData,
                    string
                >
            >
        >({});

    const handleChange = (
        field: keyof MenuItemFormData,
        value: string,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: '',
            }));
        }
    };

    const handlePickImage =
        async () => {
            const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (
                !permission.granted
            ) {
                Alert.alert(
                    'Permissão necessária',
                    'Permita acesso à galeria.',
                );

                return;
            }

            const result =
                await ImagePicker.launchImageLibraryAsync(
                    {
                        mediaTypes: [
                            'images',
                        ],
                        quality: 1,
                    },
                );

            if (
                !result.canceled
            ) {
                setFormData(
                    (
                        prev,
                    ) => ({
                        ...prev,
                        foto:
                            result
                                .assets[0]
                                .uri,
                    }),
                );
            }
        };

    const handleSubmit =
        async () => {
            const validation =
                menuItemSchema.safeParse(
                    formData,
                );

            if (
                !validation.success
            ) {
                const fieldErrors: Partial<
                    Record<
                        keyof MenuItemFormData,
                        string
                    >
                > = {};

                validation.error.issues.forEach(
                    (
                        error,
                    ) => {
                        const field =
                            error
                                .path[0] as keyof MenuItemFormData;

                        fieldErrors[
                            field
                        ] =
                            error.message;
                    },
                );

                setErrors(
                    fieldErrors,
                );

                return;
            }

            try {
                setSaving(true);

                const payload = {
                    descricao:
                        validation.data
                            .descricao,

                    historia:
                        validation.data
                            .historia,

                    preco:
                        validation.data
                            .preco,

                    categoria:
                        validation.data
                            .categoria,

                    status: true,

                    empresa_id:
                        'caa68f64-b68e-4327-90f0-264ca1bb73e2',

                    foto:
                        validation.data
                            .foto,
                };

                if (
                    isEditing &&
                    menuId
                ) {
                    await updateMenuItem(
                        menuId,
                        payload,
                    );
                } else {
                    await createMenuItem(
                        payload,
                    );

                    Alert.alert(
                        'Sucesso',
                        'Item criado com sucesso!',
                    );
                }

                onSuccess?.();

                router.back();
            } catch (error) {
                console.error(
                    error,
                );

                Alert.alert(
                    'Erro',
                    'Não foi possível salvar o item.',
                );
            } finally {
                setSaving(false);
            }
        };

    const handleDelete =
        async () => {
            if (!menuId) {
                return console.log('error id');
            }
            Alert.alert(
                'Excluir item',
                'Deseja realmente excluir este item do cardápio?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Excluir',
                        style: 'destructive',
                        onPress:
                            async () => {
                                try {
                                    setDeleting(
                                        true,
                                    );

                                    await deleteMenuItem(
                                        menuId,
                                    );

                                    Alert.alert(
                                        'Sucesso',
                                        'Item excluído com sucesso!',
                                    );

                                    router.navigate('/(mybusiness)/menu/menu');
                                } catch (error) {
                                    console.error(
                                        error,
                                    );

                                    Alert.alert(
                                        'Erro',
                                        'Não foi possível excluir o item.',
                                    );
                                } finally {
                                    setDeleting(
                                        false,
                                    );
                                }
                            },
                    },
                ],
            );
        };

    return (
        <ScrollView
            showsVerticalScrollIndicator={
                false
            }
            className="mt-6"
        >
            <Pressable
                onPress={
                    handlePickImage
                }
                className="
                    w-full h-52 rounded-3xl
                    bg-primary/5 border border-primary/10
                    items-center justify-center
                    overflow-hidden mb-6
                "
            >
                {formData.foto ? (
                    <Image
                        source={{
                            uri: formData.foto,
                        }}
                        className="w-full h-full"
                    />
                ) : (
                    <View className="items-center gap-3">
                        <Ionicons
                            name="image-outline"
                            size={40}
                            color="#C34342"
                        />

                        <Text className="text-primary font-semibold">
                            Adicionar foto
                        </Text>
                    </View>
                )}
            </Pressable>

            <View className="mb-5 gap-2">
                <Text className="font-semibold text-dark">
                    Nome do prato
                </Text>

                <TextInput
                    value={
                        formData.descricao
                    }
                    onChangeText={(
                        value,
                    ) =>
                        handleChange(
                            'descricao',
                            value,
                        )
                    }
                    placeholder="Ex: Lasanha artesanal"
                    className="
                        bg-light border border-black/10
                        rounded-2xl px-4 py-4
                    "
                />

                {errors.descricao && (
                    <Text className="text-red-500 text-xs">
                        {
                            errors.descricao
                        }
                    </Text>
                )}
            </View>

            <View className="mb-5 gap-2">
                <Text className="font-semibold text-dark">
                    Descrição
                </Text>

                <TextInput
                    value={
                        formData.descricaoCurta
                    }
                    onChangeText={(
                        value,
                    ) =>
                        handleChange(
                            'descricaoCurta',
                            value,
                        )
                    }
                    placeholder="Breve descrição do prato"
                    className="
                        bg-light border border-black/10
                        rounded-2xl px-4 py-4
                    "
                />
            </View>

            <View className="mb-5 gap-2">
                <Text className="font-semibold text-dark">
                    História do prato
                </Text>

                <TextInput
                    multiline
                    value={
                        formData.historia
                    }
                    onChangeText={(
                        value,
                    ) =>
                        handleChange(
                            'historia',
                            value,
                        )
                    }
                    placeholder="Conte a história do prato..."
                    textAlignVertical="top"
                    className="
                        bg-light border border-black/10
                        rounded-2xl px-4 py-4
                        h-40
                    "
                />
            </View>

            <View className="mb-5 gap-2">
                <Text className="font-semibold text-dark">
                    Preço
                </Text>

                <TextInput
                    value={
                        formData.preco
                    }
                    onChangeText={(
                        value,
                    ) =>
                        handleChange(
                            'preco',
                            value,
                        )
                    }
                    placeholder="Ex: 29.90"
                    keyboardType="numeric"
                    className="
                        bg-light border border-black/10
                        rounded-2xl px-4 py-4
                    "
                />

                {errors.preco && (
                    <Text className="text-red-500 text-xs">
                        {
                            errors.preco
                        }
                    </Text>
                )}
            </View>

            <View className="mb-8 gap-3">
                <Text className="font-semibold text-dark">
                    Categoria
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={
                        false
                    }
                >
                    <View className="flex-row gap-3">
                        {categories.map(
                            (
                                category,
                            ) => (
                                <Pressable
                                    key={
                                        category.value
                                    }
                                    onPress={() =>
                                        setFormData(
                                            (
                                                prev,
                                            ) => ({
                                                ...prev,
                                                categoria:
                                                    category.value,
                                            }),
                                        )
                                    }
                                    className={`
                                        px-4 py-3 rounded-2xl
                                        ${
                                            formData.categoria ===
                                            category.value
                                                ? 'bg-primary'
                                                : 'bg-light border border-black/10'
                                        }
                                    `}
                                >
                                    <Text
                                        className={`
                                            font-semibold
                                            ${
                                                formData.categoria ===
                                                category.value
                                                    ? 'text-light'
                                                    : 'text-dark'
                                            }
                                        `}
                                    >
                                        {
                                            category.label
                                        }
                                    </Text>
                                </Pressable>
                            ),
                        )}
                    </View>
                </ScrollView>
            </View>

            <Pressable
                disabled={saving}
                onPress={
                    handleSubmit
                }
                className={`
                    rounded-2xl py-5
                    items-center justify-center
                    mb-4
                    ${
                        saving
                            ? 'bg-primary/70'
                            : 'bg-primary'
                    }
                `}
            >
                {saving ? (
                    <View className="flex-row items-center gap-3">
                        <ActivityIndicator
                            color="#FFFFFF"
                        />

                        <Text className="text-light font-bold text-lg">
                            Salvando...
                        </Text>
                    </View>
                ) : (
                    <Text className="text-light font-bold text-lg">
                        {isEditing
                            ? 'Salvar alterações'
                            : 'Criar item'}
                    </Text>
                )}
            </Pressable>

            {isEditing && (
                <Pressable
                    disabled={deleting}
                    onPress={
                        handleDelete
                    }
                    className={`
                        rounded-2xl py-5
                        items-center justify-center
                        mb-10
                        ${
                            deleting
                                ? 'bg-primary/20'
                                : 'bg-primary/20'
                        }
                    `}
                >
                    {deleting ? (
                        <View className="flex-row items-center gap-3">
                            <ActivityIndicator
                                color="#C34342"
                            />

                            <Text className="text-primary font-bold text-lg">
                                Excluindo...
                            </Text>
                        </View>
                    ) : (
                        <View className="flex-row items-center gap-2">
                            <Ionicons
                                name="trash-outline"
                                size={20}
                                color="#C34342"
                            />

                            <Text className="text-primary font-bold text-lg">
                                Excluir item
                            </Text>
                        </View>
                    )}
                </Pressable>
            )}
        </ScrollView>
    );
}