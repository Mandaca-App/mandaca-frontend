import { router } from 'expo-router';
import { View } from 'react-native';
import { GridBox } from './gridBox';

export const RouteGrid = () => {
  return (
    <View className="gap-4">
      <GridBox
        icon={'storefront'}
        title="Minha Empresa"
        description="Descrição e cadastro"
        route={() => router.navigate('/myBusiness')}
      />
      <GridBox
        icon={'analytics-sharp'}
        title="Relatórios"
        description="Visão geral e 
            Insights"
        route={() => router.navigate('/(report)/report')}
      />
      <GridBox
        icon={'settings'}
        title="Configurações"
        description="Personalize o aplicativo"
        route={() => router.navigate('/settings')}
      />
      <GridBox
        icon={'hand-left'}
        title="Ajuda"
        description="Entre em contato conosco"
        route={() => router.navigate('/help')}
      />
    </View>
  );
};
