import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';

// Importa as telas do fluxo
import ScanMenuScreen from '../scan';
import ScanLoadingScreen from '../scanLoading';
import ReviewScanScreen from '../reviewScan';

// Importa os serviços
import { scanMenuImage, createMenuBulk } from '@/services/menu';

// Mock dos serviços de Menu e ImagePicker
jest.mock('@/services/menu');
jest.mock('expo-image-picker');
jest.spyOn(Alert, 'alert');

const mockScannedItems = [
  {
    descricao: 'Pizza de Calabresa',
    historia: 'Forno a lenha',
    preco: '45.00',
    categoria: 'prato_principal' as const,
  },
  {
    descricao: 'Suco de Laranja',
    historia: 'Polpa natural',
    preco: '8.00',
    categoria: 'bebida' as const,
  },
];

describe('Integração - Fluxo de Leitura de Cardápio por Scanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve executar o fluxo completo de seleção de foto, leitura por IA, revisão e persistência', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
    // === ETAPA 1: Seleção de Imagem na Tela de Scanner ===
    // Configura mocks para liberar permissão e retornar imagem mockada
    (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock)
      .mockResolvedValue({ granted: true });
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [{ uri: 'file:///fake/path/cardapio.jpg' }],
    });

    const { getByText } = render(<ScanMenuScreen />);

    // Clica para escolher da galeria
    fireEvent.press(getByText('Escolher da galeria'));

    await waitFor(() => {
      expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
    });

    // Clica no botão "Continuar" para simular a navegação
    fireEvent.press(getByText('Continuar'));

    expect(router.navigate).toHaveBeenCalledWith({
      pathname: '/(mybusiness)/menu/scanLoading',
      params: { imageUri: 'file:///fake/path/cardapio.jpg' },
    });

    // === ETAPA 2: Leitura pela IA na Tela de Carregamento ===
    // Configura o mock do serviço de scanner da IA
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      imageUri: 'file:///fake/path/cardapio.jpg',
    });
    (scanMenuImage as jest.Mock).mockResolvedValueOnce(mockScannedItems);

    const { unmount: unmountLoading } = render(<ScanLoadingScreen />);

    // Aguarda o serviço da IA ser chamado e a navegação/redirecionamento disparar
    await waitFor(() => {
      expect(scanMenuImage).toHaveBeenCalledWith('file:///fake/path/cardapio.jpg');
      expect(router.replace).toHaveBeenCalledWith({
        pathname: '/(mybusiness)/menu/reviewScan',
        params: { items: JSON.stringify(mockScannedItems) },
      });
    });

    unmountLoading();

    // === ETAPA 3: Revisão e Persistência dos Itens ===
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      items: JSON.stringify(mockScannedItems),
    });
    (createMenuBulk as jest.Mock).mockResolvedValueOnce({ success: true });

    const { getByText: getReviewText, getAllByText } = render(<ReviewScanScreen />);

    // Verifica se os pratos lidos estão renderizados na tela de revisão
    expect(getReviewText('Pizza de Calabresa')).toBeTruthy();
    expect(getReviewText('Suco de Laranja')).toBeTruthy();
    expect(getReviewText('2 itens encontrados')).toBeTruthy();

    // Simula exclusão de um item (Suco de Laranja)
    const deleteButtons = getAllByText('Excluir');
    fireEvent.press(deleteButtons[1]); // clica no botão "Excluir" do segundo item (Suco de Laranja)

    // O contador de itens deve atualizar para 1 item
    expect(getReviewText('1 itens encontrados')).toBeTruthy();

    // Clica em "Salvar no Cardápio"
    fireEvent.press(getReviewText('Salvar no Cardápio'));

    // Aguarda a persistência ser executada com o prato restante e verifica o alerta de sucesso
    await waitFor(() => {
      expect(createMenuBulk).toHaveBeenCalledWith(
        'caa68f64-b68e-4327-90f0-264ca1bb73e2', // ID do estabelecimento
        [
          {
            descricao: 'Pizza de Calabresa',
            historia: 'Forno a lenha',
            preco: '45.00',
            categoria: 'prato_principal',
          },
        ],
      );
      expect(Alert.alert).toHaveBeenCalledWith('Sucesso', 'Cardápio criado com sucesso!');
      expect(router.replace).toHaveBeenCalledWith('/(mybusiness)/menu/menu');
    });
  });
});
