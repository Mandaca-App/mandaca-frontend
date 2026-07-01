import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import GeneralButton from '@/components/general/generalButton';
import { accountSchema, AccountFormData } from '@/schemas/settingsSchema';
import { SectionCard } from './SectionCard';

type Props = {
  isDark?: boolean;
};

export const AccountSection = ({ isDark = false }: Props) => {
  // TODO: Carregar dados reais do usuário via API (GET /users/:id)
  const [formData, setFormData] = useState<AccountFormData>({
    nome: '',
    email: '',
    telefone: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AccountFormData, string>>>({});
  const [saving, setSaving] = useState<boolean>(false);

  const handleChange = (field: keyof AccountFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSave = async () => {
    const validation = accountSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof AccountFormData, string>> = {};

      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof AccountFormData;
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setSaving(true);

      // TODO: Chamar API de atualização do perfil (PUT /users/:id)
      // await updateUser(userId, validation.data);

      // Simula sucesso
      await new Promise((resolve) => setTimeout(resolve, 800));

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = `border rounded-2xl px-4 py-4 ${
    isDark
      ? 'bg-[#2A2A2A] border-white/10 text-white'
      : 'bg-light border-black/10 text-dark'
  }`;

  const labelStyle = `font-semibold mb-1 ${isDark ? 'text-white' : 'text-dark'}`;

  return (
    <SectionCard title="Conta" icon="person-outline" isDark={isDark}>
      <View className="gap-4">
        <View className="gap-2">
          <Text className={labelStyle} accessibilityLabel="Nome">
            Nome
          </Text>
          <TextInput
            value={formData.nome}
            onChangeText={(value) => handleChange('nome', value)}
            placeholder="Seu nome completo"
            placeholderTextColor={isDark ? '#888' : '#999'}
            className={inputStyle}
            accessibilityLabel="Campo de nome"
          />
          {errors.nome ? (
            <Text className="text-red-500 text-xs">{errors.nome}</Text>
          ) : null}
        </View>

        <View className="gap-2">
          <Text className={labelStyle} accessibilityLabel="E-mail">
            E-mail
          </Text>
          <TextInput
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            placeholder="seu@email.com"
            placeholderTextColor={isDark ? '#888' : '#999'}
            keyboardType="email-address"
            autoCapitalize="none"
            className={inputStyle}
            accessibilityLabel="Campo de e-mail"
          />
          {errors.email ? (
            <Text className="text-red-500 text-xs">{errors.email}</Text>
          ) : null}
        </View>

        <View className="gap-2">
          <Text className={labelStyle} accessibilityLabel="Telefone">
            Telefone
          </Text>
          <TextInput
            value={formData.telefone}
            onChangeText={(value) => handleChange('telefone', value)}
            placeholder="(81) 99999-9999"
            placeholderTextColor={isDark ? '#888' : '#999'}
            keyboardType="phone-pad"
            className={inputStyle}
            accessibilityLabel="Campo de telefone"
          />
          {errors.telefone ? (
            <Text className="text-red-500 text-xs">{errors.telefone}</Text>
          ) : null}
        </View>

        <View className="mt-2">
          <GeneralButton
            text="Salvar dados"
            handlePress={handleSave}
            loading={saving}
            disabled={saving}
          />
        </View>
      </View>
    </SectionCard>
  );
};
