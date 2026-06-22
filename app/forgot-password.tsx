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

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('E-mail é obrigatório');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Formato de e-mail inválido');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateEmail()) return;

    try {
      setLoading(true);
      // TODO: Implement actual password recovery API call
      // const response = await recoverPasswordAPI(email);
      // if (response.success) {
      //   setSubmitted(true);
      // } else {
      //   setError(response.message || 'Erro ao enviar solicitação');
      // }

      // Temporary mock
      setSubmitted(true);
      Alert.alert('Sucesso', 'Verifique seu e-mail para recuperar sua senha');
    } catch (error) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  if (submitted) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 px-8 py-10 items-center justify-center">
          {/* Success Icon */}
          <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-8">
            <Ionicons name="checkmark-circle" size={64} color="#22C55E" />
          </View>

          {/* Success Message */}
          <Text className="text-3xl font-bold text-dark text-center mb-4">
            Verifique seu E-mail
          </Text>

          <Text className="text-base text-dark/70 text-center mb-8">
            Enviamos um link para recuperação de senha para{'\n'}
            <Text className="font-semibold text-dark">{email}</Text>
          </Text>

          <Text className="text-sm text-dark/50 text-center mb-12">
            Pode levar alguns minutos para chegar. Verifique sua pasta de spam
            se não encontrar.
          </Text>

          {/* Back to Login Button */}
          <GeneralButton
            text="Voltar ao Login"
            handlePress={handleBackToLogin}
          />
        </View>
      </SafeAreaView>
    );
  }

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
              Recuperar Senha
            </Text>
            <Text className="text-base text-dark/70">
              Informe seu e-mail para receber um link de recuperação de senha
            </Text>
          </View>

          {/* Form Section */}
          <View className="gap-6 flex-1 justify-center">
            {/* Illustration */}
            <View className="items-center mb-4">
              <View className="w-32 h-32 bg-primary/10 rounded-full items-center justify-center">
                <Ionicons name="mail-open" size={56} color="#C34342" />
              </View>
            </View>

            {/* Email Input */}
            <TextInput
              label="E-mail"
              placeholder="seu@email.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError('');
              }}
              keyboardType="email-address"
              error={error}
            />

            {/* Submit Button */}
            <GeneralButton
              text="Enviar Link de Recuperação"
              handlePress={handleSubmit}
              loading={loading}
              disabled={loading}
            />

            {/* Info Text */}
            <Text className="text-xs text-dark/50 text-center">
              Você receberá um e-mail com instruções para redefinir sua senha. O
              link será válido por 24 horas.
            </Text>
          </View>

          {/* Back to Login */}
          <View className="flex-row justify-center gap-1">
            <Text className="text-dark/70">Lembrou a senha?</Text>
            <Pressable
              onPress={() => router.push('/login')}
              className="active:opacity-60"
            >
              <Text className="text-primary font-semibold">Faça login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
