import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { CardItemFeedback } from '@/components/report/CardItemFeedback';
import { CardListSkeleton } from '@/components/report/cardListSkeleton';
import { getReport } from '@/services/reports';
import { AIReportDetail } from '@/types/Report';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function PositivePoints() {
  const { report_id } = useLocalSearchParams<{ report_id: string }>();
  const [report, setReport] = useState<AIReportDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!report_id) return;
    getReport(report_id)
      .then(setReport)
      .finally(() => setLoading(false));
  }, [report_id]);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Pontos positivos" showBackButton showNotificationButton />
        <View className="mt-10">
          {loading ? (
            <CardListSkeleton />
          ) : report ? (
            <CardItemFeedback
              icon={'analytics'}
              typeCard="positive"
              text={report.pontos_positivos_detalhado}
              chages=""
              automaticChanges={false}
              handlePress={() => {}}
            />
          ) : null}
        </View>
      </ScrollView>
    </Container>
  );
}
