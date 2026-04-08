import { Enterprise } from '@/types/enterprise';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export const CompleteProfile = () => {
    const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        
        const getEnterprise = async () => {
            try {
                const enterpriseId = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';
                const response = await axios.get(
                    `https://mandaca-backend.onrender.com/enterprises/percentage/${enterpriseId}`,
                );
                if (isMounted) setEnterprise(response.data);
            } catch (error) {
                console.error('Erro ao buscar empresa:', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        getEnterprise();
        return () => { isMounted = false; }; // Limpa o efeito para evitar erros de memória
    }, []);

    if (loading) {
        return (
            <View style={{ padding: 24, alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#C34342" />
            </View>
        );
    }

    const porcentagem = enterprise?.porcentagem ?? 0;

    return (
        <View style={[style.card, style.cardShadow]}>
            <View style={style.row}>
                <Text style={style.title}>Complete seu Perfil</Text>
                <Text style={style.percentageText}>{porcentagem}%</Text>
            </View>
            
            <Text style={style.subtitle}>
                Preencha as informações para atrair mais turistas
            </Text>

            <View style={style.progressBg}>
                <View style={[style.progressBar, { width: `${porcentagem}%` }]} />
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    card: {
        padding: 24,
        backgroundColor: '#FFF', // Substitua 'light' pela cor real para testar
        borderRadius: 24,
        gap: 16,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    title: { fontWeight: 'bold', fontSize: 24 },
    percentageText: { fontWeight: 'bold', fontSize: 24, color: '#C34342' }, // Substitua pela cor do seu primary
    subtitle: { fontSize: 18 },
    progressBg: { width: '100%', height: 8, backgroundColor: '#EEE', borderRadius: 99 },
    progressBar: { height: '100%', backgroundColor: '#C34342', borderRadius: 99 },
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.8,
        elevation: 5,
    },
});