import { API_URL } from '@/constants/api';
import { AIReport } from '@/types/Report';
import axios from 'axios';

export const generateReport = async (
    empresaId: string,
): Promise<AIReport> => {
    try {
        const { data } = await axios.post<AIReport>(
            `${API_URL}/reports/generate/${empresaId}`,
        );

        return data;
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message || 'Erro ao gerar relatório',
        );
    }
};

export const getReportsByEnterprise = async (
    empresaId: string,
    ): Promise<AIReport[]> => {
        const res = await fetch(`${API_URL}/reports/by-enterprise/${empresaId}`);
    return res.json();
};

export const getReport = async (reportId: string): Promise<AIReport> => {
    const res = await fetch(`${API_URL}/reports/${reportId}`);
    return res.json();
};
