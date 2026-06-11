import axios from 'axios';
import {
  getMenuByEnterprise,
  toggleMenuItemStatus,
  getMenuById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  scanMenuImage,
  createMenuBulk,
} from '../menu';

jest.mock('axios');

describe('menuService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMenuByEnterprise', () => {
    it('deve buscar o cardapio da empresa com sucesso', async () => {
      const mockData = [{ id_cardapio: '1', descricao: 'Prato 1' }];
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const res = await getMenuByEnterprise('empresa-123');
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/menus/by-enterprise/empresa-123'));
      expect(res).toEqual(mockData);
    });
  });

  describe('toggleMenuItemStatus', () => {
    it('deve alternar o status do item com sucesso', async () => {
      const mockData = { id_cardapio: '1', status: true };
      (axios.put as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const res = await toggleMenuItemStatus('item-123', false);
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining('/menus/item-123?status=true'),
        expect.any(FormData),
        expect.any(Object)
      );
      expect(res).toEqual(mockData);
    });
  });

  describe('getMenuById', () => {
    it('deve buscar um item do cardapio pelo id', async () => {
      const mockData = { id_cardapio: '1', descricao: 'Prato 1' };
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const res = await getMenuById('item-123');
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/menus/item-123'));
      expect(res).toEqual(mockData);
    });
  });

  describe('createMenuItem', () => {
    it('deve criar um item no cardapio com foto', async () => {
      const mockData = { id_cardapio: '1', descricao: 'Novo Prato' };
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const payload = {
        descricao: 'Novo Prato',
        historia: 'Historia do prato',
        preco: '19.99',
        categoria: 'prato_principal',
        status: true,
        empresa_id: 'empresa-123',
        foto: 'file:///path/to/foto.jpg',
      };

      const res = await createMenuItem(payload);
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/menus'),
        expect.any(FormData),
        expect.objectContaining({
          params: expect.objectContaining({
            descricao: 'Novo Prato',
          }),
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
      expect(res).toEqual(mockData);
    });

    it('deve criar um item no cardapio sem foto', async () => {
      const mockData = { id_cardapio: '1', descricao: 'Novo Prato' };
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const payload = {
        descricao: 'Novo Prato',
        historia: 'Historia do prato',
        preco: '19.99',
        categoria: 'prato_principal',
        status: true,
        empresa_id: 'empresa-123',
        foto: null,
      };

      const res = await createMenuItem(payload);
      expect(axios.post).toHaveBeenCalled();
      expect(res).toEqual(mockData);
    });
  });

  describe('updateMenuItem', () => {
    it('deve atualizar um item no cardapio com foto', async () => {
      const mockData = { id_cardapio: '1', descricao: 'Prato Atualizado' };
      (axios.put as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const payload = {
        descricao: 'Prato Atualizado',
        historia: 'Historia atualizada',
        preco: '24.99',
        categoria: 'prato_principal',
        status: true,
        empresa_id: 'empresa-123',
        foto: 'file:///path/to/foto.jpg',
      };

      const res = await updateMenuItem('item-123', payload);
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining('/menus/item-123'),
        expect.any(FormData),
        expect.objectContaining({
          params: expect.objectContaining({
            descricao: 'Prato Atualizado',
          }),
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
      expect(res).toEqual(mockData);
    });

    it('deve atualizar um item no cardapio sem foto', async () => {
      const mockData = { id_cardapio: '1', descricao: 'Prato Atualizado' };
      (axios.put as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const payload = {
        descricao: 'Prato Atualizado',
        historia: 'Historia atualizada',
        preco: '24.99',
        categoria: 'prato_principal',
        status: true,
        empresa_id: 'empresa-123',
        foto: null,
      };

      const res = await updateMenuItem('item-123', payload);
      expect(axios.put).toHaveBeenCalled();
      expect(res).toEqual(mockData);
    });
  });

  describe('deleteMenuItem', () => {
    it('deve deletar um item do cardapio com sucesso', async () => {
      const mockData = { success: true };
      (axios.delete as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const res = await deleteMenuItem('item-123');
      expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/menus/item-123'));
      expect(res).toEqual(mockData);
    });
  });

  describe('scanMenuImage', () => {
    it('deve escanear a imagem do cardapio com sucesso', async () => {
      const mockData = { items: [] };
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const res = await scanMenuImage('file:///path/to/menu.jpg');
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/menus/scan'),
        expect.any(FormData),
        expect.any(Object)
      );
      expect(res).toEqual(mockData);
    });
  });

  describe('createMenuBulk', () => {
    it('deve criar itens em massa com sucesso', async () => {
      const mockData = { success: true };
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const items = [
        { id_cardapio: '1', descricao: 'Item 1', historia: 'Hist 1', preco: '10.00', categoria: 'entrada', status: true, empresa_id: 'empresa-123', url_foto_item: null },
      ];

      const res = await createMenuBulk('empresa-123', items);
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/menus/bulk/empresa-123'),
        {
          items: [
            {
              id_cardapio: '1',
              descricao: 'Item 1',
              historia: 'Hist 1',
              preco: '10.00',
              categoria: 'entrada',
              status: true,
              empresa_id: 'empresa-123',
              url_foto_item: null,
            },
          ],
        }
      );
      expect(res).toEqual(mockData);
    });
  });
});
