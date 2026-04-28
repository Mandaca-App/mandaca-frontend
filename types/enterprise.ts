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

export type EnterprisePercentage = {
    id_empresa: string;
    nome: string;
    porcentagem: number;
    campos_preenchidos: string[];
    campos_faltando: string[];
};
