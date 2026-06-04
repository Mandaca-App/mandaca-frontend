import axios from 'axios';

import { API_URL } from '@/constants/api';
import { MenuScanItem } from '@/types/menu';

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

export type MenuPayload = {
    descricao: string;
    historia: string;
    preco: string;
    categoria: string;
    status: boolean;
    empresa_id: string;
    foto?: string | null;
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

export const getMenuById =
    async (
        menuId: string,
    ) => {
        const response =
            await axios.get(
                `${API_URL}/menus/${menuId}`,
            );

        return response.data;
    };

export const createMenuItem = async (
    payload: MenuPayload,
) => {
    const formData = new FormData();

    if (payload.foto) {
        formData.append('foto', {
            uri: payload.foto,
            name: 'menu-image.jpg',
            type: 'image/jpeg',
        } as any);
    } else {
        formData.append('foto', '');
    }

    const response = await axios.post(
        `${API_URL}/menus`,
        formData,
        {
            params: {
                descricao:
                    payload.descricao,
                historia:
                    payload.historia,
                preco: payload.preco,
                categoria:
                    payload.categoria,
                status: payload.status,
                empresa_id:
                    payload.empresa_id,
            },
            headers: {
                'Content-Type':
                    'multipart/form-data',
            },
        },
    );

    return response.data;
};

export const updateMenuItem = async (
    menuId: string,
    payload: MenuPayload,
) => {
    const formData = new FormData();

    if (payload.foto) {
        formData.append('foto', {
            uri: payload.foto,
            name: 'menu-image.jpg',
            type: 'image/jpeg',
        } as any);
    } else {
        formData.append('foto', '');
    }

    const response = await axios.put(
        `${API_URL}/menus/${menuId}`,
        formData,
        {
            params: {
                descricao:
                    payload.descricao,
                historia:
                    payload.historia,
                preco: payload.preco,
                categoria:
                    payload.categoria,
                status: payload.status,
                empresa_id:
                    payload.empresa_id,
            },
            headers: {
                'Content-Type':
                    'multipart/form-data',
            },
        },
    );

    return response.data;
};

export const deleteMenuItem = async (
    menuId: string,
) => {
    const response = await axios.delete(
        `${API_URL}/menus/${menuId}`,
    );

    return response.data;
};

export const scanMenuImage = async (
    imageUri: string,
) => {
    const formData = new FormData();

    formData.append(
        'foto',
        {
            uri: imageUri,
            name: 'menu.jpg',
            type: 'image/jpeg',
        } as any,
    );

    const response =
        await axios.post(
            `${API_URL}/menus/scan`,
            formData,
            {
                headers: {
                    'Content-Type':
                        'multipart/form-data',
                },
            },
        );

    return response.data;
};

export const createMenuBulk =
    async (
        enterpriseId: string,
        items: MenuScanItem[],
    ) => {
        const response =
            await axios.post(
                `${API_URL}/menus/bulk/${enterpriseId}`,
                {
                    items: items.map(
                        (
                            item,
                        ) => ({
                            ...item,
                            status: true,
                            url_foto_item:
                                null,
                        }),
                    ),
                },
            );

        return response.data;
    };