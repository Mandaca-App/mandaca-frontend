import { getContacts } from '@/services/contactService';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Linking } from 'react-native';
import { useRouter } from 'expo-router';
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
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: jest.fn(),
    });
  });

  it('deve renderizar a tela e carregar contatos', async () => {
    (getContacts as jest.Mock).mockResolvedValueOnce(mockContacts);
    const { getByText } = render(<HelpScreen />);

    await waitFor(() => {
      expect(getContacts).toHaveBeenCalled();
    });

    fireEvent.press(getByText('Fale Conosco'));
    await waitFor(() => {
      expect(getByText('Conversar no WhatsApp')).toBeTruthy();
    });
  });

  it('deve ir para o chatbot ao clicar em Iniciar Conversa', async () => {
    (getContacts as jest.Mock).mockResolvedValueOnce([]);
    const { getByText } = render(<HelpScreen />);

    await waitFor(() => {
      expect(getContacts).toHaveBeenCalled();
    });

    fireEvent.press(getByText('Iniciar Conversa'));
    expect(mockPush).toHaveBeenCalledWith('/consultant');
  });

  it('deve ir para a tela de tutoriais ao clicar em Tutoriais', async () => {
    (getContacts as jest.Mock).mockResolvedValueOnce([]);
    const { getByText } = render(<HelpScreen />);

    await waitFor(() => {
      expect(getContacts).toHaveBeenCalled();
    });

    fireEvent.press(getByText('Tutoriais'));
    expect(mockPush).toHaveBeenCalledWith('/(help)/tutorials');
  });

  it('deve abrir o modal de Fale Conosco e acionar links de WhatsApp, Telefone e E-mail', async () => {
    (getContacts as jest.Mock).mockResolvedValueOnce(mockContacts);
    const { getByText } = render(<HelpScreen />);

    await waitFor(() => {
      expect(getContacts).toHaveBeenCalled();
    });

    // Abrir o modal
    fireEvent.press(getByText('Fale Conosco'));

    // Testar clique no WhatsApp
    const whatsappButton = getByText('Conversar no WhatsApp');
    fireEvent.press(whatsappButton);
    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalledWith(
        'https://wa.me/5511999999999',
      );
    });

    // Abrir modal novamente (pois fechou ao clicar)
    fireEvent.press(getByText('Fale Conosco'));
    const phoneButton = getByText('Ligar por Telefone');
    fireEvent.press(phoneButton);
    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalledWith('tel:11999999999');
    });

    // Abrir modal novamente
    fireEvent.press(getByText('Fale Conosco'));
    const emailButton = getByText('Enviar E-mail');
    fireEvent.press(emailButton);
    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalledWith(
        expect.stringContaining('mailto:suporte-teste@mandaca.com.br'),
      );
    });
  });
});
