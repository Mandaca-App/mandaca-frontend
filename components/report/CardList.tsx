import { AIReport } from '@/types/Report';
import { router } from 'expo-router';
import { View } from 'react-native';
import { CardItem } from './CardItem';

type Props = {
  report: AIReport;
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
        topics={report.pontos_positivos.map((item, i) => ({
          id: i,
          text: item.resumo,
        }))}
        typeCard="positive"
        handlePress={handlePressPositive}
      />
      <CardItem
        icon={'warning'}
        topics={report.melhorias.map((item, i) => ({
          id: i,
          text: item.resumo,
        }))}
        typeCard="negative"
        handlePress={handlePressNegative}
      />
      <CardItem
        icon={'bulb'}
        topics={report.recomendacoes.map((item, i) => ({
          id: i,
          text: item.resumo,
        }))}
        typeCard="recomendation"
        handlePress={handlePressRecomendation}
      />
    </View>
  );
};
