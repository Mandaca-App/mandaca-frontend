// components/report/CardList.tsx

import { generateReport } from '@/services/reports';

import { AIReport } from '@/types/Report';

import { router } from 'expo-router';

import { useState } from 'react';

import { View } from 'react-native';

import Toast from 'react-native-toast-message';

import { CardItem } from './CardItem';

import { GenerateReportButton } from './generateReportButton';

type Props = {
    report: AIReport;
    onRefresh?: (
        newReport: AIReport,
    ) => void;
};

export const CardList = ({
    report,
    onRefresh,
}: Props) => {
    const [loading, setLoading] =
        useState(false);

    const handleGenerateReport =
        async () => {
            try {
                setLoading(true);

                const newReport =
                    await generateReport(
                        report.empresa_id,
                    );

                onRefresh?.(newReport);

                Toast.show({
                    type: 'success',
                    text1: 'Relatório atualizado',
                    text2:
                        'Os dados foram atualizados com sucesso.',
                });
            } catch (error) {
                console.log(
                    'Erro ao gerar relatório:',
                    error,
                );

                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2:
                        'Não foi possível atualizar o relatório.',
                });
            } finally {
                setLoading(false);
            }
        };

    const handlePressPositive = () => {
        router.navigate({
            pathname:
                '/positivePoints' as any,
            params: {
                report_id:
                    report.id_relatorio,
            },
        });
    };

    const handlePressNegative = () => {
        router.navigate({
            pathname:
                '/negativePoints' as any,
            params: {
                report_id:
                    report.id_relatorio,
            },
        });
    };

    const handlePressRecomendation =
        () => {
            router.navigate({
                pathname:
                    '/recomendations' as any,
                params: {
                    report_id:
                        report.id_relatorio,
                },
            });
        };

    return (
        <View className="mt-10 gap-8">
            <GenerateReportButton
                label="Gerar novo Relatório"
                handlePress={
                    handleGenerateReport
                }
                loading={loading}
            />

            <CardItem
                icon={'analytics'}
                topics={report.pontos_positivos.map(
                    (item, i) => ({
                        id: i,
                        text: item.resumo,
                    }),
                )}
                typeCard="positive"
                handlePress={
                    handlePressPositive
                }
            />

            <CardItem
                icon={'warning'}
                topics={report.melhorias.map(
                    (item, i) => ({
                        id: i,
                        text: item.resumo,
                    }),
                )}
                typeCard="negative"
                handlePress={
                    handlePressNegative
                }
            />

            <CardItem
                icon={'bulb'}
                topics={report.recomendacoes.map(
                    (item, i) => ({
                        id: i,
                        text: item.resumo,
                    }),
                )}
                typeCard="recomendation"
                handlePress={
                    handlePressRecomendation
                }
            />
        </View>
    );
};