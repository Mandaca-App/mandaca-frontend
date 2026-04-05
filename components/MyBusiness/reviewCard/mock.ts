import { ReviewSentiment } from './main';

export interface Review {
  id: number;
  name: string;
  sentiment: ReviewSentiment;
  comment: string;
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Maria da Silva Santos',
    sentiment: 'elogios',
    comment:
      'Adorei o atendimento! Comida fresca, bem temperada e equipe muito atenciosa. Voltarei com certeza!',
  },
  {
    id: 2,
    name: 'João Oliveira',
    sentiment: 'dicas',
    comment:
      'Muito bom! Só sugiro aumentar um pouco a quantidade de tempero no arroz. Mas no geral, recomendo!',
  },
  {
    id: 3,
    name: 'Ana Costa Ribeiro',
    sentiment: 'duvidas',
    comment:
      'Qual é a procedência das carnes? Vocês usam fornecedores locais? Gostaria de saber mais sobre isso.',
  },
  {
    id: 4,
    name: 'Carlos Mendes',
    sentiment: 'elogios',
    comment:
      'Excelente culinária nordestina! Ambiente aconchegante e preço justo. Recomendo para todos os amigos!',
  },
  {
    id: 5,
    name: 'Fernanda Gomes',
    sentiment: 'dicas',
    comment:
      'Pensei que teria mais opções vegetarianas. Mas os drinks são incríveis! Voltarei para experimentar mais.',
  },
  {
    id: 6,
    name: 'Roberto Alves',
    sentiment: 'duvidas',
    comment: 'Fazem delivery? Qual é o tempo de entrega para a região central?',
  },
  {
    id: 7,
    name: 'Lucia Martins',
    sentiment: 'elogios',
    comment:
      'Melhor comida que já comi! Parabéns à equipe. Voltei 3 vezes em um mês, isso é tudo que preciso falar.',
  },
];
