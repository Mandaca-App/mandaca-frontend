import { getContacts } from '@/services/contactService';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import HelpScreen from '../help';

jest.mock('@/services/contactService');

const mockContacts = [
  {
    id_contato: 'contact-123',
    telefone: '(11) 99999-9999',
    email: 'suporte-teste@mandaca.com.br',
    whatsapp: '5511999999999',
  },
];

describe('HelpScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve abrir o modal de Fale Conosco com as opções de contato dinâmicas', async () => {
    (getContacts as jest.Mock).mockResolvedValueOnce(mockContacts);

    const { getByText, queryByText } = render(<HelpScreen />);

    // Espera os contatos carregarem silenciosamente
    await waitFor(() => {
      expect(getContacts).toHaveBeenCalled();
    });

    // Clica no botão "Fale Conosco"
    fireEvent.press(getByText('Fale Conosco'));

    // Verifica se as opções do modal estão visíveis
    expect(getByText('Conversar no WhatsApp')).toBeTruthy();
    expect(getByText('Ligar por Telefone')).toBeTruthy();
    expect(getByText('Enviar E-mail')).toBeTruthy();
  });
});
