import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import GeneralButton from '@/components/general/generalButton';
import { passwordSchema, PasswordFormData } from '@/schemas/settingsSchema';
import { SectionCard } from './SectionCard';

type Props = {
  isDark?: boolean;
};

type PasswordFormFields = {
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
};

const getPasswordStrength = (
  password: string,
): { level: number; label: string; color: string } => {
  if (password.length === 0) return { level: 0, label: '', color: '#E0E0E0' };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: 'Fraca', color: '#E53935' };
  if (score === 2) return { level: 2, label: 'Média', color: '#FB8C00' };
  if (score === 3) return { level: 3, label: 'Boa', color: '#43A047' };
  return { level: 4, label: 'Forte', color: '#2E7D32' };
};

export const PasswordSection = ({ isDark = false }: Props) => {
  const [formData, setFormData] = useState<PasswordFormFields>({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: '',
  });

  const [showSenhaAtual, setShowSenhaAtual] = useState<boolean>(false);
  const [showNovaSenha, setShowNovaSenha] = useState<boolean>(false);
  const [showConfirmar, setShowConfirmar] = useState<boolean>(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof PasswordFormFields, string>>
  >({});
  const [saving, setSaving] = useState<boolean>(false);

  const strength = getPasswordStrength(formData.novaSenha);

  const handleChange = (field: keyof PasswordFormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    const validation = passwordSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof PasswordFormFields, string>> = {};

      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof PasswordFormFields;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setSaving(true);

      // TODO: Chamar API de troca de senha (PUT /users/:id/password)
      // await changePassword({ senhaAtual: validation.data.senhaAtual, novaSenha: validation.data.novaSenha });

      // Simula resposta do servidor
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simula erro de senha atual incorreta para demonstração
      // Em produção, o backend retornaria 401/403
      // Mensagem genérica para prevenção de enumeração de usuário
      const senhaCorreta = true; // TODO: Verificar resposta real do backend
      if (!senhaCorreta) {
        Alert.alert(
          'Erro',
          'Não foi possível alterar a senha. Verifique os dados informados.',
        );
        return;
      }

      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setFormData({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      // Mensagem genérica — não indicar se a senha atual está correta ou não
      Alert.alert(
        'Erro',
        'Não foi possível alterar a senha. Verifique os dados informados.',
      );
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
    <SectionCard title="Alterar senha" icon="lock-closed-outline" isDark={isDark}>
      <View className="gap-4">
        <View className="gap-2">
          <Text className={labelStyle} accessibilityLabel="Senha atual">
            Senha atual
          </Text>
          <View className="relative">
            <TextInput
              value={formData.senhaAtual}
              onChangeText={(value) => handleChange('senhaAtual', value)}
              placeholder="Digite sua senha atual"
              placeholderTextColor={isDark ? '#888' : '#999'}
              secureTextEntry={!showSenhaAtual}
              className={inputStyle}
              accessibilityLabel="Campo de senha atual"
            />
            <Pressable
              onPress={() => setShowSenhaAtual(!showSenhaAtual)}
              className="absolute right-4 top-4"
              accessibilityLabel={showSenhaAtual ? 'Ocultar senha atual' : 'Mostrar senha atual'}
            >
              <Ionicons
                name={showSenhaAtual ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color={isDark ? '#888' : '#666'}
              />
            </Pressable>
          </View>
          {errors.senhaAtual ? (
            <Text className="text-red-500 text-xs">{errors.senhaAtual}</Text>
          ) : null}
        </View>

        <View className="gap-2">
          <Text className={labelStyle} accessibilityLabel="Nova senha">
            Nova senha
          </Text>
          <View className="relative">
            <TextInput
              value={formData.novaSenha}
              onChangeText={(value) => handleChange('novaSenha', value)}
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor={isDark ? '#888' : '#999'}
              secureTextEntry={!showNovaSenha}
              className={inputStyle}
              accessibilityLabel="Campo de nova senha"
            />
            <Pressable
              onPress={() => setShowNovaSenha(!showNovaSenha)}
              className="absolute right-4 top-4"
              accessibilityLabel={showNovaSenha ? 'Ocultar nova senha' : 'Mostrar nova senha'}
            >
              <Ionicons
                name={showNovaSenha ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color={isDark ? '#888' : '#666'}
              />
            </Pressable>
          </View>
          {errors.novaSenha ? (
            <Text className="text-red-500 text-xs">{errors.novaSenha}</Text>
          ) : null}

          {formData.novaSenha.length > 0 && (
            <View className="gap-1 mt-1">
              <View className="flex-row gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <View
                    key={i}
                    className="flex-1 h-1 rounded-full"
                    style={{
                      backgroundColor:
                        i <= strength.level ? strength.color : isDark ? '#333' : '#E0E0E0',
                    }}
                  />
                ))}
              </View>
              <Text
                className="text-xs"
                style={{ color: strength.color }}
              >
                {strength.label}
              </Text>
            </View>
          )}
        </View>

        <View className="gap-2">
          <Text className={labelStyle} accessibilityLabel="Confirmar nova senha">
            Confirmar nova senha
          </Text>
          <View className="relative">
            <TextInput
              value={formData.confirmarSenha}
              onChangeText={(value) => handleChange('confirmarSenha', value)}
              placeholder="Repita a nova senha"
              placeholderTextColor={isDark ? '#888' : '#999'}
              secureTextEntry={!showConfirmar}
              className={inputStyle}
              accessibilityLabel="Campo de confirmação de senha"
            />
            <Pressable
              onPress={() => setShowConfirmar(!showConfirmar)}
              className="absolute right-4 top-4"
              accessibilityLabel={showConfirmar ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'}
            >
              <Ionicons
                name={showConfirmar ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color={isDark ? '#888' : '#666'}
              />
            </Pressable>
          </View>
          {errors.confirmarSenha ? (
            <Text className="text-red-500 text-xs">
              {errors.confirmarSenha}
            </Text>
          ) : null}
        </View>

        <View className="mt-2">
          <GeneralButton
            text="Alterar senha"
            handlePress={handleSubmit}
            loading={saving}
            disabled={saving}
          />
        </View>
      </View>
    </SectionCard>
  );
};
