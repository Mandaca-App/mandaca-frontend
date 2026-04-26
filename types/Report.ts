export type AIReportSummary = {
  id_relatorio: string
  empresa_id: string
  contexto_id: string
  pontos_positivos_resumo: string
  melhorias_resumo: string
  recomendacoes_resumo: string
  criado_em: string
}

export type AIReportDetail = AIReportSummary & {
  pontos_positivos_detalhado: string
  melhorias_detalhado: string
  recomendacoes_detalhado: string
}
