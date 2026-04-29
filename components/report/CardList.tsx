import { AIReportSummary } from '@/types/Report';
import { router } from 'expo-router';
import { View } from 'react-native';
import { CardItem } from './CardItem';

type Props = {
  report: AIReportSummary;
};

export const CardList = ({ report }: Props) => {
  const handlePressPositive = () => {
    router.navigate({
      pathname: '/positivePoints' as any,
      params: { report_id: report.id_relatorio },
    });
  };
  const handlePressNegative = () => {
    router.navigate({
      pathname: '/negativePoints' as any,
      params: { report_id: report.id_relatorio },
    });
  };
  const handlePressRecomendation = () => {
    router.navigate({
      pathname: '/recomendations' as any,
      params: { report_id: report.id_relatorio },
    });
  };

  return (
    <View className="mt-10 gap-8">
      <CardItem
        icon={'analytics'}
        topics={[{ id: 1, text: report.pontos_positivos_resumo }]}
        typeCard="positive"
        handlePress={handlePressPositive}
      />
      <CardItem
        icon={'warning'}
        topics={[{ id: 2, text: report.melhorias_resumo }]}
        typeCard="negative"
        handlePress={handlePressNegative}
      />
      <CardItem
        icon={'bulb'}
        topics={[{ id: 3, text: report.recomendacoes_resumo }]}
        typeCard="recomendation"
        handlePress={handlePressRecomendation}
      />
    </View>
  );
};
