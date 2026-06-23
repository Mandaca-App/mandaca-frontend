import GeneralButton from '@/components/general/generalButton';
import { TextInput } from '@/components/ui/textInput';
import { registerFormSchema } from '@/schemas/registerSchema';
import { registerUser } from '@/services/authService';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';

type FieldErrors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    nome?: string;
    cpf?: string;
};

export default function Register() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nome: '',
        cpf: '',
    });

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const formatCpf = (value: string) => {
        // Mantém só dígitos, max 11
        return value.replace(/\D/g, '').slice(0, 11);
    };

    const validate = (): boolean => {
        const result = registerFormSchema.safeParse(form);

        if (result.success) {
            setFieldErrors({});
            return true;
        }

        const errors: FieldErrors = {};
        for (const issue of result.error.issues) {
            const field = issue.path[0] as keyof FieldErrors;
            if (!errors[field]) {
                errors[field] = issue.message;
            }
        }
        setFieldErrors(errors);
        return false;
    };

    const handleRegister = async () => {
        if (!validate()) return;

        try {
            setLoading(true);

            await registerUser({
                email: form.email.trim().toLowerCase(),
                password: form.password,
                tipo_usuario: 'empreendedor',
                nome: form.nome.trim(),
                cpf: form.cpf,
            });

            router.replace('/home');
        } catch (error: any) {
            const status = error?.response?.status;
            const detail = error?.response?.data?.detail ?? '';

            if (status === 400 && detail.toLowerCase().includes('email')) {
                setFieldErrors((prev) => ({ ...prev, email: 'Este e-mail já está em uso' }));
            } else if (status === 400 && detail.toLowerCase().includes('cpf')) {
                setFieldErrors((prev) => ({ ...prev, cpf: 'Este CPF já está cadastrado' }));
            } else {
                Alert.alert('Erro', 'Não foi possível realizar o cadastro. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 px-8 py-10 justify-between">

                        {/* Header */}
                        <View className="gap-2 mb-4">
                            <Pressable
                                onPress={() => router.back()}
                                className="flex-row items-center gap-2 mb-4"
                            >
                                <Ionicons name="chevron-back" size={24} color="#C34342" />
                                <Text className="text-base font-semibold text-primary">Voltar</Text>
                            </Pressable>
                            <Text className="text-3xl font-bold text-dark mb-2">Criar Conta</Text>
                            <Text className="text-base text-dark/70">
                                Preencha os dados abaixo para começar
                            </Text>
                        </View>

                        {/* Formulário */}
                        <View className="gap-5 flex-1 justify-center">

                            <TextInput
                                label="Nome completo"
                                placeholder="Seu nome"
                                value={form.nome}
                                onChangeText={(v) => handleChange('nome', v)}
                                error={fieldErrors.nome}
                            />

                            <TextInput
                                label="CPF"
                                placeholder="Somente números (11 dígitos)"
                                value={form.cpf}
                                onChangeText={(v) => handleChange('cpf', formatCpf(v))}
                                keyboardType="numeric"
                                error={fieldErrors.cpf}
                            />

                            <TextInput
                                label="E-mail"
                                placeholder="seu@email.com"
                                value={form.email}
                                onChangeText={(v) => handleChange('email', v)}
                                keyboardType="email-address"
                                error={fieldErrors.email}
                            />

                            <TextInput
                                label="Senha"
                                placeholder="Mín. 8 caracteres"
                                value={form.password}
                                onChangeText={(v) => handleChange('password', v)}
                                secureTextEntry
                                error={fieldErrors.password}
                            />

                            {/* Dica de senha */}
                            {!fieldErrors.password && (
                                <View className="flex-row flex-wrap gap-2 -mt-2">
                                    {[
                                        { label: 'Maiúscula', ok: /[A-Z]/.test(form.password) },
                                        { label: 'Minúscula', ok: /[a-z]/.test(form.password) },
                                        { label: 'Número', ok: /\d/.test(form.password) },
                                        { label: 'Símbolo', ok: /[^A-Za-z0-9]/.test(form.password) },
                                    ].map(({ label, ok }) => (
                                        <View
                                            key={label}
                                            className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${ok ? 'bg-green-100' : 'bg-gray-100'
                                                }`}
                                        >
                                            <Ionicons
                                                name={ok ? 'checkmark-circle' : 'ellipse-outline'}
                                                size={12}
                                                color={ok ? '#16a34a' : '#9ca3af'}
                                            />
                                            <Text
                                                className={`text-xs ${ok ? 'text-green-700' : 'text-gray-400'}`}
                                            >
                                                {label}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            <TextInput
                                label="Confirmar senha"
                                placeholder="Repita a senha"
                                value={form.confirmPassword}
                                onChangeText={(v) => handleChange('confirmPassword', v)}
                                secureTextEntry
                                error={fieldErrors.confirmPassword}
                            />

                            <GeneralButton
                                text={loading ? 'Cadastrando...' : 'Criar conta'}
                                handlePress={handleRegister}
                                disabled={loading}
                                loading={loading}
                            />
                        </View>

                        {/* Rodapé */}
                        <View className="flex-row justify-center gap-1 mt-6 mb-4">
                            <Text className="text-dark/70">Já tem uma conta?</Text>
                            <Pressable onPress={() => router.push('/login')} className="active:opacity-60">
                                <Text className="text-primary font-semibold">Entrar</Text>
                            </Pressable>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
