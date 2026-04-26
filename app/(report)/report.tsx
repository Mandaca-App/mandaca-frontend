import { Container } from '@/components/general/container';
import GeneralButton from '@/components/general/generalButton';
import { Header } from '@/components/general/header';
import { CardList } from '@/components/report/CardList';
import { CardListSkeleton } from '@/components/report/cardListSkeleton';
import { generateReport, getReportsByEnterprise } from '@/services/reports';
import { AIReportSummary } from '@/types/Report';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

export default function Report() {
  const [report, setReport] = useState<AIReportSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchLatestReport();
  }, []);

  const fetchLatestReport = async () => {
    try {
      setLoading(true);
      const reports = await getReportsByEnterprise(ENTERPRISE_ID);
      if (reports.length > 0) {
        setReport(reports[reports.length - 1]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      const newReport = await generateReport(ENTERPRISE_ID);
      setReport(newReport);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Container>
      <View>
        <Header title="Relatório" showBackButton showNotificationButton />
        {loading ? (
          <CardListSkeleton />
        ) : report ? (
          <CardList report={report} />
        ) : (
          <View className="mt-16 items-center gap-6 px-8">
            <Text className="text-center text-dark font-semibold text-base">
              Nenhum relatório gerado ainda. Gere o primeiro relatório do seu negócio.
            </Text>
            <GeneralButton
              text="Gerar Relatório"
              handlePress={handleGenerate}
              loading={generating}
            />
          </View>
        )}
      </View>
    </Container>
  );
}
