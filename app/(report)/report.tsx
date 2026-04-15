import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { CardList } from '@/components/report/CardList';
import { CardListSkeleton } from '@/components/report/cardListSkeleton';
import { ChatButton } from '@/components/report/chatButton';
import { useState } from 'react';
import { View } from 'react-native';

export default function Profile() {
    const [loading, setLoading] = useState(false)

    const handlePress = ()=> {
        setLoading //to do
    }
  
    return (
    <Container>
      <View>
        <Header title="Relatório" showBackButton showNotificationButton />
        <ChatButton text='ChatBot' handlePress={handlePress}/>
        {loading ? (
            <CardListSkeleton />
        ) : (
            <CardList />
        )}
      </View>
    </Container>
  );
}
