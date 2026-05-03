import {
  Assessment,
  getAssessmentsByEnterprisePaginated,
} from '@/services/assessmentService';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

interface UseAssessmentsResult {
  assessments: Assessment[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useAssessments = (enterpriseId: string): UseAssessmentsResult => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const loadAssessments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAssessmentsByEnterprisePaginated(enterpriseId, 1);
      setAssessments(result.items);
      setHasMore(result.has_more);
      setCurrentPage(1);
    } catch (err) {
      console.error('Erro ao carregar avaliações:', err);
      setError('Não foi possível carregar as avaliações');
    } finally {
      setLoading(false);
    }
  }, [enterpriseId]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const result = await getAssessmentsByEnterprisePaginated(
        enterpriseId,
        nextPage,
      );
      setAssessments((prev) => [...prev, ...result.items]);
      setHasMore(result.has_more);
      setCurrentPage(nextPage);
    } catch (err) {
      console.error('Erro ao carregar mais avaliações:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [enterpriseId, currentPage, loadingMore, hasMore]);

  useFocusEffect(
    useCallback(() => {
      loadAssessments();
    }, [loadAssessments]),
  );

  return {
    assessments,
    loading,
    loadingMore,
    hasMore,
    error,
    refetch: loadAssessments,
    loadMore,
  };
};
