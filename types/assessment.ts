import { ReviewSentiment } from './reviewSentiment';

export interface AssessmentDTO {
    id_avaliacao: string;
    texto: string;
    tipo_avaliacao: ReviewSentiment;
    usuario_id: string;
    empresa_id: string;
}

export interface UserDTO {
    id_usuario: string;
    nome: string;
    email: string;
}

export interface EnterpriseDTO {
    id_empresa: string;
    nome: string;
}

/**
 * View enriched de Assessment com dados de usuário e empresa
 * Útil quando backend retorna dados relacionados
 */
export interface AssessmentEnrichedDTO extends AssessmentDTO {
    usuario?: UserDTO;
    empresa?: EnterpriseDTO;
}

/**
 * Estatísticas de avaliações por tipo
 * Possível endpoint futuro: GET /assessments/stats/enterprise/{id}
 */
export interface AssessmentStatsDTO {
    total: number;
    positiva: number;
    negativa: number;
    neutra: number;
    sugestao: number;
    duvida: number;
    avgSentiment?: number; // -1 a 1 ou percentual
    recentCount: number; // últimos 7 dias
}
