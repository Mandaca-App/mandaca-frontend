export type Enterprise = {
    id_empresa: string;
    nome: string | null;
    especialidade: string | null;
    endereco: string | null;
    latitude: number | null;
    longitude: number | null;
    historia: string | null;
    hora_abrir: string | null;
    hora_fechar: string | null;
    telefone: string | null;
    usuario_id: string;
};