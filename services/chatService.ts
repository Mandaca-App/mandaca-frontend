import { API_URL } from '@/constants/api';
import { ChatMessage } from '@/types';
import axios from 'axios';

const API_ENDPOINT = `${API_URL}/chat`;

export interface ChatHistoryItem {
    id_mensagem: string;
    empresa_id: string;
    conteudo_usuario: string;
    conteudo_assistente: string;
    criado_em: string;
}

export interface ChatHistoryResponse {
    historico: ChatHistoryItem[];
}

export interface ChatMessageResponse {
    reply: string;
}

/**
 * Envia uma mensagem para o chatbot e retorna a resposta
 */
export async function sendChatMessage(
    message: string,
    enterpriseId: string,
    usuarioId: string,
): Promise<string> {
    try {
        const response = await axios.post<ChatMessageResponse>(
            `${API_ENDPOINT}/message`,
            {
                empresa_id: enterpriseId,
                usuario_id: usuarioId,
                mensagem: message,
            },
            { timeout: 30000 },
        );

        return response.data.reply;
    } catch (error: any) {
        console.error('Erro ao enviar mensagem:', error);
        throw error;
    }
}

/**
 * Recupera o histórico de chat de uma empresa
 */
export async function getChatHistory(enterpriseId: string): Promise<ChatMessage[]> {
    try {
        const response = await axios.get<ChatHistoryResponse>(
            `${API_ENDPOINT}/history/${enterpriseId}`,
            { timeout: 10000 },
        );

        const messages: ChatMessage[] = response.data.historico.map((item) => ({
            id: item.id_mensagem,
            type: 'user',
            content: item.conteudo_usuario,
            timestamp: new Date(item.criado_em),
            contentType: 'text',
        }));

        const messagesWithReplies: ChatMessage[] = [];
        for (const item of response.data.historico) {
            // Adiciona mensagem do usuário
            messagesWithReplies.push({
                id: `${item.id_mensagem}-user`,
                type: 'user',
                content: item.conteudo_usuario,
                timestamp: new Date(item.criado_em),
                contentType: 'text',
            });

            // Adiciona resposta do assistente
            messagesWithReplies.push({
                id: `${item.id_mensagem}-assistant`,
                type: 'bot',
                content: item.conteudo_assistente,
                timestamp: new Date(item.criado_em),
                contentType: 'text',
            });
        }

        return messagesWithReplies;
    } catch (error: any) {
        console.error('Erro ao carregar histórico:', error);
        throw error;
    }
}
