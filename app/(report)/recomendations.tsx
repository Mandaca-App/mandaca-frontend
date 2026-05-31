import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { CardItemFeedback } from '@/components/report/CardItemFeedback';
import { CardListSkeleton } from '@/components/report/cardListSkeleton';

import {
    applyEnterpriseSuggestion,
    buildSuggestionText,
} from '@/services/reportFeedback';

import { getReport } from '@/services/reports';

import {
    AIReport,
    Suggestion,
} from '@/types/Report';

import { useLocalSearchParams } from 'expo-router';

import { useEffect, useState } from 'react';

import {
    ScrollView,
    View,
} from 'react-native';

const ENTERPRISE_ID =
    'caa68f64-b68e-4327-90f0-264ca1bb73e2';

export default function Recomendations() {
    const { report_id } =
        useLocalSearchParams<{
            report_id: string;
        }>();

    const [report, setReport] =
        useState<AIReport | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        if (!report_id) {
            return;
        }

        getReport(report_id)
            .then(setReport)
            .finally(() => setLoading(false));
    }, [report_id]);

    const handleApplySuggestion = async (
        suggestion?: Suggestion | null,
    ) => {
        await applyEnterpriseSuggestion(
            ENTERPRISE_ID,
            suggestion,
        );
    };

    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Header
                    title="Recomendações"
                    showBackButton
                    showNotificationButton
                />

                <View className="mt-10 gap-6">
                    {loading ? (
                        <CardListSkeleton />
                    ) : (
                        report?.recomendacoes.map(
                            (item, index) => (
                                <CardItemFeedback
                                    key={index}
                                    icon={'bulb'}
                                    typeCard="recomendation"
                                    text={
                                        item.descricao
                                    }
                                    suggestions={buildSuggestionText(
                                        item.sugestao,
                                    )}
                                    automaticSuggestions={
                                        item.pode_auto_aplicar
                                    }
                                    handlePress={() =>
                                        handleApplySuggestion(
                                            item.sugestao,
                                        )
                                    }
                                />
                            ),
                        )
                    )}
                </View>
            </ScrollView>
        </Container>
    );
}