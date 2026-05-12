import { API_URL } from '@/constants/api';
import { Suggestion } from '@/types/Report';
import axios from 'axios';

type EnterprisePayload = {
    nome?: string;
    especialidade?: string;
    endereco?: string;
    historia?: string;
    hora_abrir?: string;
    hora_fechar?: string;
    telefone?: string;
    usuario_id?: string;
};

export const buildSuggestionText = (
    suggestion?: Suggestion | null,
): string => {
    if (!suggestion) {
        return '';
    }

    const field = suggestion.campo_para_alterar
    const newValue = suggestion.novo_valor

    return `O campo "${field}" será alterado para "${newValue}"`;
};

export const applyEnterpriseSuggestion = async (
    enterpriseId: string,
    suggestion?: Suggestion | null,
): Promise<void> => {
    if (!suggestion) {
        return;
    }

    if (suggestion.target !== 'enterprise') {
        console.log(
            'Auto apply para cardápio ainda não implementado.',
        );

        return;
    }

    const payload: EnterprisePayload = {
        [suggestion.campo_para_alterar]:
            suggestion.novo_valor,
    };

    await axios.put(
        `${API_URL}/enterprises/${enterpriseId}`,
        payload,
    );
};