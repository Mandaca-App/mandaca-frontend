import { router } from 'expo-router';
import { View } from 'react-native';
import { GridBox } from './gridBox';

export const RouteGrid = () => {
  return (
    <View className="gap-4">
    <GridBox
        icon="document-text"
        title="Relatório"
        description="Veja análises inteligentes e melhorias automáticas."
        route={() => router.push('/report')}
        variant="highlight"
    />

    <GridBox
        icon="business"
        title="Minha Empresa"
        description="Edite informações e acompanhe seu negócio."
        route={() => router.push('/myBusiness')}
        variant="highlight"
    />

    <View className="flex-row gap-4">
        <View className="flex-1">
            <GridBox
                icon="help-circle"
                title="Ajuda"
                description="Central de suporte"
                route={() => router.push('/help')}
            />
        </View>

        <View className="flex-1">
            <GridBox
                icon="settings"
                title="Configurações"
                description="Preferências"
                route={() => router.push('/settings')}
            />
        </View>
    </View>
</View>
  );
};
