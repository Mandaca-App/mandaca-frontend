import { getContacts } from '@/services/contactService';
import { getTutorials } from '@/services/tutorialService';
import axios from 'axios';

jest.mock('axios');

describe('Services Coverage Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('contactService', () => {
    it('deve retornar contatos com sucesso', async () => {
      const mockData = [{ id_contato: '1', email: 'test@test.com' }];
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const res = await getContacts();
      expect(res).toEqual(mockData);
    });

    it('deve retornar array vazio no erro', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API error'));

      const res = await getContacts();
      expect(res).toEqual([]);
    });
  });

  describe('tutorialService', () => {
    it('deve retornar tutoriais com sucesso', async () => {
      const mockData = [{ id: '1', titulo: 'Tutorial' }];
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const res = await getTutorials();
      expect(res).toEqual(mockData);
    });

    it('deve passar a categoria como param se informada', async () => {
      const mockData = [{ id: '1', titulo: 'Tutorial' }];
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const res = await getTutorials('cardapio');
      expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
        params: { categoria: 'cardapio' },
      });
      expect(res).toEqual(mockData);
    });

    it('deve retornar array vazio no erro', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API error'));

      const res = await getTutorials();
      expect(res).toEqual([]);
    });
  });
});
