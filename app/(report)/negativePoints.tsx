import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { NegativeFeedbackList } from '@/components/report/NegativeFeedbackList';
import { View } from 'react-native';

export default function NegativePoints () {
    return(
        <Container>
            <View>
                <Header 
                    title="Pontos negativos" 
                    showBackButton 
                    showNotificationButton 
                />

                <NegativeFeedbackList handlePress={() => ''} />
            </View>
        </Container>
    )
}