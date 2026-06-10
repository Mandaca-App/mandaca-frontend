import { getTutorials } from '@/services/tutorialService';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Linking } from 'react-native';
import TutorialsScreen from '../tutorials';

// Mockando os serviços
jest.mock('@/services/tutorialService');

const mockTutorials = [
    {
        id: '1',
        categoria: 'geral',
        titulo: 'Tutorial Geral',
        descricao: 'Como usar o aplicativo',
        url: 'https://youtube.com/tutorial-geral',
        ordem: 1,
        ativo: true,
        created_at: '',
        updated_at: '',
    },
];

describe('TutorialsScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve renderizar a lista de tutoriais corretamente após carregar', async () => {
        (getTutorials as jest.Mock).mockResolvedValueOnce(mockTutorials);

        const { getByText, queryByText } = render(<TutorialsScreen />);

        // Verifica se o loading aparece primeiro
        expect(getByText('Carregando tutoriais...')).toBeTruthy();

        // Espera os dados da API carregarem
        await waitFor(() => {
            expect(queryByText('Carregando tutoriais...')).toBeNull();
        });

        expect(getByText('Tutorial Geral')).toBeTruthy();
        expect(getByText('Como usar o aplicativo')).toBeTruthy();
    });

    it('deve abrir o link do tutorial ao clicar no card', async () => {
        (getTutorials as jest.Mock).mockResolvedValueOnce(mockTutorials);

        const { findByText } = render(<TutorialsScreen />);

        const button = await findByText('Assistir Tutorial');
        fireEvent.press(button);

        await waitFor(() => {
            expect(Linking.openURL).toHaveBeenCalledWith('https://youtube.com/tutorial-geral');
        });
    });
});
