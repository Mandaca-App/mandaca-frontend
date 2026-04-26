import axios from 'axios'
import { API_URL } from '@/constants/api'
import { AIReportDetail, AIReportSummary } from '@/types/Report'

export const generateReport = async (empresaId: string): Promise<AIReportDetail> => {
  const { data } = await axios.post<AIReportDetail>(`${API_URL}/reports/generate/${empresaId}`)
  return data
}

export const getReportsByEnterprise = async (empresaId: string): Promise<AIReportSummary[]> => {
  const { data } = await axios.get<AIReportSummary[]>(`${API_URL}/reports/by-enterprise/${empresaId}`)
  return data
}

export const getReport = async (reportId: string): Promise<AIReportDetail> => {
  const { data } = await axios.get<AIReportDetail>(`${API_URL}/reports/${reportId}`)
  return data
}
