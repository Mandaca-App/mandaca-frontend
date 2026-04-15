import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { CardList } from '@/components/report/CardList';
import { ChatButton } from '@/components/report/chatButton';
import { View } from 'react-native';

export default function Profile() {
  
    const handlePress = ()=> {
        // to do
    }
  
    return (
    <Container>
      <View>
        <Header title="Relatório" showBackButton showNotificationButton />
        <ChatButton text='ChatBot' handlePress={handlePress}/>
        <CardList/>
      </View>
    </Container>
  );
}
