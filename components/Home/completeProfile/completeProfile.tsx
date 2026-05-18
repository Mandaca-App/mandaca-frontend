import { API_URL } from '@/constants/api';
import { EnterprisePercentage } from '@/types/enterprise';

import Ionicons from '@expo/vector-icons/Ionicons';

import axios from 'axios';

import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const CompleteProfile = () => {
    const [enterprise, setEnterprise] =
        useState<EnterprisePercentage | null>(
            null,
        );

    const [loading, setLoading] =
        useState<boolean>(true);

    const getEnterprise = async () => {
        try {
            const enterpriseId =
                'caa68f64-b68e-4327-90f0-264ca1bb73e2';

            const response =
                await axios.get(
                    `${API_URL}/enterprises/percentage/${enterpriseId}`,
                );

            if (
                response.data &&
                typeof response.data
                    .porcentagem ===
                    'number'
            ) {
                setEnterprise(
                    response.data,
                );
            }
        } catch (error) {
            console.error(
                'Erro ao buscar empresa:',
                error,
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEnterprise();
    }, []);

    if (loading) {
        return (
            <View className="bg-light rounded-3xl py-10 items-center justify-center">
                <ActivityIndicator
                    size="large"
                    color="#C34342"
                />
            </View>
        );
    }

    const porcentagem =
        enterprise?.porcentagem ?? 0;

    const progressColor =
        porcentagem >= 80
            ? 'bg-primary'
            : porcentagem >= 50
              ? 'bg-yellow-500'
              : 'bg-primary';

    return (
        <View
            className="bg-light rounded-3xl p-6 gap-6"
            style={styles.cardShadow}
        >
            <View className="flex-row justify-between items-start">
                <View className="flex-1 gap-2">
                    <View className="flex-row items-center gap-3">
                        <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center">
                            <Ionicons
                                name="person-circle"
                                size={30}
                                color="#C34342"
                            />
                        </View>

                        <View className="flex-1">
                            <Text className="text-2xl font-bold text-dark">
                                Complete seu perfil
                            </Text>

                            <Text className="text-sm text-black/50 mt-1">
                                Melhore a presença do
                                seu restaurante
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="items-center">
                    <Text className="text-3xl font-bold text-primary">
                        {porcentagem}%
                    </Text>

                    <Text className="text-xs text-black/40">
                        Completo
                    </Text>
                </View>
            </View>

            <View className="gap-3">
                <View className="w-full h-4 bg-black/5 rounded-full overflow-hidden">
                    <View
                        className={`h-full rounded-full ${progressColor}`}
                        style={{
                            width: `${porcentagem}%`,
                        }}
                    />
                </View>

                <View className="flex-row justify-between">
                    <Text className="text-xs text-black/40">
                        Incompleto
                    </Text>

                    <Text className="text-xs text-black/40">
                        Perfil otimizado
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 6,
    },
});