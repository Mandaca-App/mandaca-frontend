export type CategoriaTutorial = 'cardapio' | 'reserva' | 'relatorios' | 'geral';

export interface Tutorial {
  id: string;
  categoria: CategoriaTutorial;
  titulo: string;
  descricao: string | null;
  url: string;
  ordem: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}
