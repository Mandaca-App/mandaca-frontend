import { Assessment, getAssessmentsByEnterprise } from '@/services/assessmentService';
import { getUserById } from '@/services/userService';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

interface UseAssessmentsResult {
    assessments: Assessment[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useAssessments = (enterpriseId: string): UseAssessmentsResult => {
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const enrichAssessmentsWithUserNames = async (data: Assessment[]) => {
        const enriched = await Promise.all(
            data.map(async (assessment) => {
                if (!assessment.usuario_nome) {
                    const user = await getUserById(assessment.usuario_id);
                    return {
                        ...assessment,
                        usuario_nome: user?.nome || 'Anônimo',
                    };
                }
                return assessment;
            }),
        );
        return enriched;
    };

    const loadAssessments = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAssessmentsByEnterprise(enterpriseId);
            const enriched = await enrichAssessmentsWithUserNames(data);
            setAssessments(enriched);
        } catch (err) {
            console.error('Erro ao carregar avaliações:', err);
            setError('Não foi possível carregar as avaliações');
        } finally {
            setLoading(false);
        }
    }, [enterpriseId]);

    useFocusEffect(
        useCallback(() => {
            loadAssessments();
        }, [loadAssessments]),
    );

    return {
        assessments,
        loading,
        error,
        refetch: loadAssessments,
    };
};
