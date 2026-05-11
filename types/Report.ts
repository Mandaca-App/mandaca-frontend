export type ReportItem = {
  titulo: string;
  resumo: string;
  descricao: string;
  pode_auto_aplicar: boolean;
  sugestao: any | null;
};

export type AIReport = {
  id_relatorio: string;
  empresa_id: string;
  contexto_id: string;
  pontos_positivos: ReportItem[];
  melhorias: ReportItem[];
  recomendacoes: ReportItem[];
  criado_em: string;
};
