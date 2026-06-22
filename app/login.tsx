import GeneralButton from '@/components/general/generalButton';
import { TextInput } from '@/components/ui/textInput';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Formato de e-mail inválido';
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      // TODO: Implement actual login API call
      // const response = await loginAPI(email, password);
      // if (response.success) {
      //   router.push('/home');
      // } else {
      //   Alert.alert('Erro', response.message || 'E-mail ou senha incorretos');
      // }

      // Temporary mock login
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      router.push('/home');
    } catch {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-8 py-10 justify-between">
          {/* Header */}
          <View className="gap-2 mb-4">
            <Pressable
              onPress={() => router.back()}
              className="flex-row items-center gap-2 mb-4"
            >
              <Ionicons name="chevron-back" size={24} color="#C34342" />
              <Text className="text-base font-semibold text-primary">
                Voltar
              </Text>
            </Pressable>
            <Text className="text-3xl font-bold text-dark mb-2">
              Acesso à Conta
            </Text>
            <Text className="text-base text-dark/70">
              Faça login com seu e-mail e senha para continuar
            </Text>
          </View>

          {/* Form Section */}
          <View className="gap-5 flex-1 justify-center">
            {/* Email Input */}
            <TextInput
              label="E-mail"
              placeholder="seu@email.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              keyboardType="email-address"
              error={errors.email}
            />

            {/* Password Input */}
            <TextInput
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              secureTextEntry
              error={errors.password}
            />

            {/* Forgot Password Link */}
            <View className="flex-row justify-end">
              <Pressable
                onPress={() => router.push('/forgot-password')}
                className="active:opacity-60"
              >
                <Text className="text-primary font-semibold">
                  Esqueci minha senha
                </Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <GeneralButton
              text="Entrar"
              handlePress={handleLogin}
              loading={loading}
              disabled={loading}
            />
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center gap-1 mb-4">
            <Text className="text-dark/70">Não tem uma conta?</Text>
            <Pressable
              onPress={() => router.push('/')}
              className="active:opacity-60"
            >
              <Text className="text-primary font-semibold">Cadastre-se</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
