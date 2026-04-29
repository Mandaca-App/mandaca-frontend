import { API_URL } from '@/constants/api';
import { AIReportDetail, AIReportSummary } from '@/types/Report';

export const generateReport = async (
  empresaId: string,
): Promise<AIReportDetail> => {
  const res = await fetch(`${API_URL}/reports/generate/${empresaId}`, {
    method: 'POST',
  });
  return res.json();
};

export const getReportsByEnterprise = async (
  empresaId: string,
): Promise<AIReportSummary[]> => {
  const res = await fetch(`${API_URL}/reports/by-enterprise/${empresaId}`);
  return res.json();
};

export const getReport = async (reportId: string): Promise<AIReportDetail> => {
  const res = await fetch(`${API_URL}/reports/${reportId}`);
  return res.json();
};
