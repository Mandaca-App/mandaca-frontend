import { CompleteProfile } from '@/components/Home/completeProfile/completeProfile';
import { Header } from '@/components/Home/header/header';
import { RouteGrid } from '@/components/Home/routeGrid/main';
import { ScrollView, View } from 'react-native';

export default function Home() {
  return (
    <ScrollView>
      <Header />
      <View className='px-8 py-5 mb-5 gap-8'>
        <CompleteProfile />
        <RouteGrid />
      </View>
    </ScrollView>
  );
}
