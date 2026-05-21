import { API_URL } from '@/constants/api';
import { ChatMessage } from '@/types';
import axios from 'axios';
import * as FileSystem from 'expo-file-system/legacy';

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

const AUDIO_MIME_TYPES: Record<string, string> = {
  m4a: 'audio/mp4',
  mp4: 'audio/mp4',
  mp3: 'audio/mpeg',
  '3gp': 'audio/3gpp',
  aac: 'audio/aac',
  wav: 'audio/wav',
};

export async function transcribeAudio(uri: string): Promise<string> {
  const extension = uri.split('.').pop()?.toLowerCase() ?? 'm4a';
  const mimeType = AUDIO_MIME_TYPES[extension] ?? 'audio/mp4';

  const result = await FileSystem.uploadAsync(
    `${API_URL}/transcriptions/chat`,
    uri,
    {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'audio',
      mimeType,
    },
  );

  if (result.status < 200 || result.status >= 300) {
    throw new Error(`HTTP ${result.status}`);
  }

  const data = JSON.parse(result.body);
  return data.transcription ?? '';
}

/**
 * Recupera o histórico de chat de uma empresa
 */
export async function getChatHistory(
  enterpriseId: string,
): Promise<ChatMessage[]> {
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
      messages: messages,
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
