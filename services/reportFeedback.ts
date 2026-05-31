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

const fieldLabels: Record<string, string> = {
    nome: 'nome da empresa',
    especialidade: 'especialidade',
    endereco: 'endereço',
    historia: 'história',
    hora_abrir: 'hora de abertura',
    hora_fechar: 'hora de fechamento',
    telefone: 'telefone',
};

export const buildSuggestionText = (
    suggestion?: Suggestion | null,
): string => {
    if (!suggestion) {
        return '';
    }

    const friendlyField =
        fieldLabels[
            suggestion.campo_para_alterar
        ] ||
        suggestion.campo_para_alterar;

    return `Alterar ${friendlyField} para "${suggestion.novo_valor}"`;
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