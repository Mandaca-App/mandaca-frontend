import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { RecommendationFeedbackList } from '@/components/report/RecommendationFeedbackList';
import { View } from 'react-native';

export default function Recomendations () {
    return(
        <Container>
            <View>
                <Header 
                    title="Recomendações" 
                    showBackButton 
                    showNotificationButton 
                />

                <RecommendationFeedbackList handlePress={() => ''} />
            </View>
        </Container>
    )
}