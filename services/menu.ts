import axios from 'axios';

import { API_URL } from '@/constants/api';

export type MenuItem = {
  id_cardapio: string;
  descricao: string;
  historia: string;
  preco: string;
  categoria: string;
  status: boolean;
  empresa_id: string;
  url_foto_item: string | null;
};

export const getMenuByEnterprise = async (
  enterpriseId: string,
): Promise<MenuItem[]> => {
  const response = await axios.get(
    `${API_URL}/menus/by-enterprise/${enterpriseId}`,
  );

  return response.data;
};

export const toggleMenuItemStatus = async (
  menuId: string,
  currentStatus: boolean,
) => {
  const newStatus = !currentStatus;

  const formData = new FormData();

  formData.append('foto', '');

  const response = await axios.put(
    `${API_URL}/menus/${menuId}?status=${newStatus}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
