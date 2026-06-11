import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MenuList from '../menu';
import { getMenuByEnterprise, toggleMenuItemStatus, MenuItem } from '@/services/menu';

const mockNavigate = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();

jest.mock('expo-router', () => ({
  router: {
    navigate: mockNavigate,
    replace: mockReplace,
    back: mockBack,
  },
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
  useLocalSearchParams: jest.fn(() => ({})),
}));

jest.mock('@/services/menu');

const mockMenuItems: MenuItem[] = [
  {
    id_cardapio: 'item-1',
    descricao: 'Hambúrguer Gourmet',
    historia: 'Feito com blend especial de carnes',
    preco: '35.00',
    categoria: 'lanche',
    status: true,
    empresa_id: 'caa68f64-b68e-4327-90f0-264ca1bb73e2',
    url_foto_item: 'https://example.com/hamburguer.jpg',
  },
  {
    id_cardapio: 'item-2',
    descricao: 'Refrigerante Cola',
    historia: 'Gelado e refrescante',
    preco: '6.00',
    categoria: 'bebida',
    status: false,
    empresa_id: 'caa68f64-b68e-4327-90f0-264ca1bb73e2',
    url_foto_item: null,
  },
];

describe('MenuList Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o estado de carregamento inicialmente', async () => {
    (getMenuByEnterprise as jest.Mock).mockReturnValue(
      new Promise(() => {}), // never resolves to keep loading active
    );
    const { getByText } = render(<MenuList />);
    
    expect(getByText('Carregando cardápio...')).toBeTruthy();
  });

  it('deve renderizar o estado de cardápio vazio se a lista retornada for vazia', async () => {
    (getMenuByEnterprise as jest.Mock).mockResolvedValueOnce([]);
    
    const { getByText, queryByText } = render(<MenuList />);

    await waitFor(() => {
      expect(queryByText('Carregando cardápio...')).toBeNull();
    });

    expect(getByText('Você ainda não possui um cardápio')).toBeTruthy();
    expect(getByText('Adicionar item manualmente')).toBeTruthy();
    expect(getByText('Escanear cardápio')).toBeTruthy();
  });

  it('deve navegar para a tela de form de criação ao clicar em adicionar item no estado vazio', async () => {
    (getMenuByEnterprise as jest.Mock).mockResolvedValueOnce([]);
    const { getByText, queryByText } = render(<MenuList />);

    await waitFor(() => {
      expect(queryByText('Carregando cardápio...')).toBeNull();
    });

    fireEvent.press(getByText('Adicionar item manualmente'));
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/(mybusiness)/menu/form',
      params: { mode: 'create' },
    });
  });

  it('deve navegar para a tela de escaneamento ao clicar em escanear no estado vazio', async () => {
    (getMenuByEnterprise as jest.Mock).mockResolvedValueOnce([]);
    const { getByText, queryByText } = render(<MenuList />);

    await waitFor(() => {
      expect(queryByText('Carregando cardápio...')).toBeNull();
    });

    fireEvent.press(getByText('Escanear cardápio'));
    expect(mockNavigate).toHaveBeenCalledWith('/(mybusiness)/menu/scan');
  });

  it('deve renderizar os itens do cardápio quando houver dados', async () => {
    (getMenuByEnterprise as jest.Mock).mockResolvedValueOnce(mockMenuItems);
    const { getByText, queryByText } = render(<MenuList />);

    await waitFor(() => {
      expect(queryByText('Carregando cardápio...')).toBeNull();
    });

    expect(getByText('Meu Cardápio')).toBeTruthy();
    expect(getByText('Hambúrguer Gourmet')).toBeTruthy();
    expect(getByText('Refrigerante Cola')).toBeTruthy();
  });

  it('deve filtrar os itens por categoria ao clicar no filtro de categoria', async () => {
    (getMenuByEnterprise as jest.Mock).mockResolvedValueOnce(mockMenuItems);
    const { getByText, queryByText } = render(<MenuList />);

    await waitFor(() => {
      expect(queryByText('Carregando cardápio...')).toBeNull();
    });

    // Clicar no filtro de Lanches
    fireEvent.press(getByText('Lanches'));

    // O Hambúrguer (lanche) deve aparecer
    expect(getByText('Hambúrguer Gourmet')).toBeTruthy();
    // O Refrigerante (bebida) não deve aparecer
    expect(queryByText('Refrigerante Cola')).toBeNull();
  });

  it('deve mostrar mensagem de nenhum item encontrado se filtrar por categoria vazia', async () => {
    (getMenuByEnterprise as jest.Mock).mockResolvedValueOnce(mockMenuItems);
    const { getByText, queryByText } = render(<MenuList />);

    await waitFor(() => {
      expect(queryByText('Carregando cardápio...')).toBeNull();
    });

    // Clicar no filtro de Sobremesas (não temos nenhuma sobremesa)
    fireEvent.press(getByText('Sobremesas'));

    expect(getByText('Nenhum item encontrado')).toBeTruthy();
    expect(queryByText('Hambúrguer Gourmet')).toBeNull();
    expect(queryByText('Refrigerante Cola')).toBeNull();
  });

  it('deve navegar para a tela de criação ao clicar em Adicionar Item no estado populado', async () => {
    (getMenuByEnterprise as jest.Mock).mockResolvedValueOnce(mockMenuItems);
    const { getByText, queryByText } = render(<MenuList />);

    await waitFor(() => {
      expect(queryByText('Carregando cardápio...')).toBeNull();
    });

    fireEvent.press(getByText('Adicionar item'));
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/(mybusiness)/menu/form',
      params: { mode: 'create' },
    });
  });

  it('deve navegar para a tela de edição ao clicar em Editar item em um card de item', async () => {
    (getMenuByEnterprise as jest.Mock).mockResolvedValueOnce(mockMenuItems);
    const { getAllByText, queryByText } = render(<MenuList />);

    await waitFor(() => {
      expect(queryByText('Carregando cardápio...')).toBeNull();
    });

    // Temos dois cards, cada um com um botão "Editar item"
    const editButtons = getAllByText('Editar item');
    fireEvent.press(editButtons[0]); // primeiro card (Hambúrguer, id_cardapio: 'item-1')

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/(mybusiness)/menu/form',
      params: { mode: 'edit', id: 'item-1' },
    });
  });

  it('deve alternar o status do item (disponibilidade) ao alterar o Switch', async () => {
    (getMenuByEnterprise as jest.Mock).mockResolvedValue(mockMenuItems);
    (toggleMenuItemStatus as jest.Mock).mockResolvedValueOnce({ success: true });

    const { getAllByRole, queryByText } = render(<MenuList />);

    await waitFor(() => {
      expect(queryByText('Carregando cardápio...')).toBeNull();
    });

    const switches = getAllByRole('switch');
    // Alternar o primeiro switch (item-1, de true para false)
    fireEvent(switches[0], 'valueChange', false);

    await waitFor(() => {
      expect(toggleMenuItemStatus).toHaveBeenCalledWith('item-1', true);
      expect(getMenuByEnterprise).toHaveBeenCalledTimes(2); // Initial load + reload
    });
  });
});
