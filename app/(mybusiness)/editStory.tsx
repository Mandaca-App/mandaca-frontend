import AudioBox from '@/components/editStory/audioBox';
import Checklist from '@/components/editStory/checklist';
import EnterpriseInput, { formatHour } from '@/components/editStory/enterpriseInput';
import InputBox from '@/components/editStory/inputBox';
import ToggleWrite from '@/components/editStory/toggleWrite';
import { Container } from '@/components/general/container';
import GeneralButton from '@/components/general/generalButton';
import { Header } from '@/components/general/header';

import { addressSchema, closeHourSchema, nameSchema, openHourSchema, phoneSchema, specialtySchema, storySchema } from '@/schemas/storySchema';

import {
    getEnterprise,
    updateEnterpriseStory,
} from '@/services/enterpriseStory';

import { Enterprise } from '@/types/enterprise';

import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import {
    Alert,
    ScrollView,
    Text,
    View,
} from 'react-native';

const ENTERPRISE_ID =
    'caa68f64-b68e-4327-90f0-264ca1bb73e2';

type EnterpriseForm = {
    nome: string;
    especialidade: string;
    endereco: string;
    telefone: string;
    hora_abrir: string;
    hora_fechar: string;
};

type FieldErrors = {
    nome?: string;
    especialidade?: string;
    endereco?: string;
    telefone?: string;
    hora_abrir?: string;
    hora_fechar?: string;
    historia?: string;
};

export default function EditStory() {
    const [toggle, setToggle] =
        useState<'WRITE' | 'AUDIO'>('WRITE');

    const [text, setText] = useState('');

    const [detectedTopics, setDetectedTopics] =
        useState<string[]>([]);

    const [isSaving, setIsSaving] =
        useState(false);

    const [enterprise, setEnterprise] =
        useState<Enterprise | null>(null);
        enterprise

    const [fieldErrors, setFieldErrors] =
        useState<FieldErrors>({});

    const [form, setForm] =
        useState<EnterpriseForm>({
            nome: '',
            especialidade: '',
            endereco: '',
            telefone: '',
            hora_abrir: '',
            hora_fechar: '',
        });

    const mapEnterpriseToTopics = (
        enterprise: Enterprise,
    ): string[] => {
        const topics: string[] = [];

        if (enterprise.nome) {
            topics.push('Nome do negócio');
        }

        if (enterprise.especialidade) {
            topics.push(
                'Sua especialidade (produtos/serviços)',
            );
        }

        if (enterprise.endereco) {
            topics.push('Localização / Bairro');
        }

        if (enterprise.historia) {
            topics.push(
                'Sua história ou o diferencial',
            );
        }

        return topics;
    };

    useEffect(() => {
        const fetchEnterprise = async () => {
            try {
                const data =
                    await getEnterprise(
                        ENTERPRISE_ID,
                    );

                setEnterprise(data);

                setForm({
                    nome: data.nome || '',
                    especialidade:
                        data.especialidade || '',
                    endereco:
                        data.endereco || '',
                    telefone:
                        data.telefone || '',
                    hora_abrir: formatHour(
                        data.hora_abrir,
                    ),
                    hora_fechar: formatHour(
                        data.hora_fechar,
                    ),
                });

                if (data.historia) {
                    setText(data.historia);
                    setToggle('WRITE');
                }

                const topics =
                    mapEnterpriseToTopics(data);

                setDetectedTopics(topics);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEnterprise();
    }, []);

    const handleChangeForm = (
        field: keyof EnterpriseForm,
        value: string,
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        setFieldErrors((prev) => ({
            ...prev,
            [field]: undefined,
        }));
    };

    const validateFields = (): boolean => {
        const errors: FieldErrors = {};

        const nameResult =
            nameSchema.safeParse({
                nome: form.nome,
            });

        if (!nameResult.success) {
            errors.nome =
                nameResult.error.issues[0]
                    .message;
        }

        const specialtyResult =
            specialtySchema.safeParse({
                especialidade:
                    form.especialidade,
            });

        if (!specialtyResult.success) {
            errors.especialidade =
                specialtyResult.error.issues[0]
                    .message;
        }

        const addressResult =
            addressSchema.safeParse({
                endereco: form.endereco,
            });

        if (!addressResult.success) {
            errors.endereco =
                addressResult.error.issues[0]
                    .message;
        }

        const phoneResult =
            phoneSchema.safeParse({
                telefone: form.telefone,
            });

        if (!phoneResult.success) {
            errors.telefone =
                phoneResult.error.issues[0]
                    .message;
        }

        const openHourResult =
            openHourSchema.safeParse({
                hora_abrir:
                    form.hora_abrir,
            });

        if (!openHourResult.success) {
            errors.hora_abrir =
                openHourResult.error.issues[0]
                    .message;
        }

        const closeHourResult =
            closeHourSchema.safeParse({
                hora_fechar:
                    form.hora_fechar,
            });

        if (!closeHourResult.success) {
            errors.hora_fechar =
                closeHourResult.error.issues[0]
                    .message;
        }

        const storyResult =
            storySchema.safeParse({
                historia: text.trim(),
            });

        if (!storyResult.success) {
            errors.historia =
                storyResult.error.issues[0]
                    .message;
        }

        setFieldErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        try {
            const isValid =
                validateFields();

            if (!isValid) {
                return;
            }

            setIsSaving(true);

            await updateEnterpriseStory(
                ENTERPRISE_ID,
                {
                    historia: text.trim(),
                    nome: form.nome,
                    especialidade:
                        form.especialidade,
                    endereco:
                        form.endereco,
                    telefone:
                        form.telefone,
                    hora_abrir:
                        form.hora_abrir,
                    hora_fechar:
                        form.hora_fechar,
                },
            );

            const updatedData =
                await getEnterprise(
                    ENTERPRISE_ID,
                );

            setEnterprise(updatedData);

            const topics =
                mapEnterpriseToTopics(
                    updatedData,
                );

            setDetectedTopics(topics);

            setText(
                updatedData.historia || '',
            );

            router.replace(
                '/(mybusiness)/businessOverview',
            );
        } catch (error) {
            console.error(error);

            Alert.alert(
                'Erro',
                'Não foi possível salvar os dados.',
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={{
                    paddingBottom: 40,
                }}
            >
                <View className="gap-6">
                    <Header
                        title="Editar História"
                        showBackButton
                        showNotificationButton
                    />

                    <EnterpriseInput
                        label="Nome da empresa"
                        value={form.nome}
                        error={
                            fieldErrors.nome
                        }
                        onChangeText={(
                            value: string,
                        ) =>
                            handleChangeForm(
                                'nome',
                                value,
                            )
                        }
                        placeholder="Digite o nome da empresa"
                    />

                    <EnterpriseInput
                        label="Especialidade"
                        value={
                            form.especialidade
                        }
                        error={
                            fieldErrors.especialidade
                        }
                        onChangeText={(
                            value: string,
                        ) =>
                            handleChangeForm(
                                'especialidade',
                                value,
                            )
                        }
                        placeholder="Ex: Comida nordestina"
                    />

                    <EnterpriseInput
                        label="Localização"
                        value={
                            form.endereco
                        }
                        error={
                            fieldErrors.endereco
                        }
                        onChangeText={(
                            value: string,
                        ) =>
                            handleChangeForm(
                                'endereco',
                                value,
                            )
                        }
                        placeholder="Digite o endereço"
                    />

                    <EnterpriseInput
                        label="Telefone"
                        value={
                            form.telefone
                        }
                        error={
                            fieldErrors.telefone
                        }
                        onChangeText={(
                            value: string,
                        ) =>
                            handleChangeForm(
                                'telefone',
                                value,
                            )
                        }
                        placeholder="(81) 99999-9999"
                    />

                    <EnterpriseInput
                        label="Hora de abertura"
                        value={
                            form.hora_abrir
                        }
                        error={
                            fieldErrors.hora_abrir
                        }
                        onChangeText={(
                            value: string,
                        ) =>
                            handleChangeForm(
                                'hora_abrir',
                                value,
                            )
                        }
                        placeholder="08:00"
                        isTime
                    />

                    <EnterpriseInput
                        label="Hora de fechamento"
                        value={
                            form.hora_fechar
                        }
                        error={
                            fieldErrors.hora_fechar
                        }
                        onChangeText={(
                            value: string,
                        ) =>
                            handleChangeForm(
                                'hora_fechar',
                                value,
                            )
                        }
                        placeholder="22:00"
                        isTime
                    />

                    <Text className="pt-8 text-center text-lg font-semibold">
                        Conte a história do seu
                        restaurante.
                    </Text>

                    <ToggleWrite
                        toggle={toggle}
                        setToggle={setToggle}
                    />

                    {toggle ===
                        'WRITE' && (
                        <InputBox
                            text={text}
                            setText={
                                setText
                            }
                            error={
                                fieldErrors.historia
                            }
                        />
                    )}

                    {toggle ===
                        'AUDIO' && (
                        <AudioBox
                            setText={
                                setText
                            }
                            setToggle={
                                setToggle
                            }
                        />
                    )}

                    <Checklist
                        detectedTopics={
                            detectedTopics
                        }
                    />

                    <GeneralButton
                        text={"Editar imagens"}
                        handlePress={()=> router.navigate('/(mybusiness)/manageImages')}
                    />

                    <GeneralButton
                        text={
                            isSaving
                                ? 'Salvando...'
                                : 'Salvar'
                        }
                        handlePress={
                            handleSave
                        }
                        disabled={
                            isSaving
                        }
                    />
                </View>
            </ScrollView>
        </Container>
    );
}
