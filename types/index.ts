export type ReviewSentiment = 'elogios' | 'dicas' | 'duvidas';

export type ChatMessage = {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  contentType?: 'text' | 'audio';
};
