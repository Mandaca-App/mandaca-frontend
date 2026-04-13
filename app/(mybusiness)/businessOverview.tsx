import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import Address from '@/components/overview/address';
import EditButton from '@/components/overview/editButton';
import Journey from '@/components/overview/journey';

const BASE_URL = 'https://mandaca-backend.onrender.com';
const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

export default function Overview () {
    const [story, setStory] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const loadOverview = useCallback(async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `${BASE_URL}/enterprises/overview`,
                {
                    params: { enterprise_id: ENTERPRISE_ID },
                }
            );

            setStory(response.data.historia ?? '');
            setAddress(response.data.endereco ?? '');

        } catch (error) {
            console.error('Erro ao buscar visão geral:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados.');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadOverview();
        }, [loadOverview]),
    );

    return(
        <Container>
            <Header title="Visão geral" showBackButton showNotificationButton />

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color={"#C34342"}/>
                </View>
            ) : (
                <>
                    <Journey story={story}/>
                    <Address address={address}/>
                    <EditButton/>
                </>
            )}

        </Container>
    );
}