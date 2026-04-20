import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { PositiveFeedbackList } from '@/components/report/PositiveFeedbackList';
import { View } from 'react-native';

export default function PositivePoints () {
    return(
        <Container>
            <View>
                <Header 
                    title="Pontos positivos" 
                    showBackButton 
                    showNotificationButton 
                />

                <PositiveFeedbackList handlePress={() => ''} />
            </View>
        </Container>
    )
}