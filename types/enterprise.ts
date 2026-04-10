export type Enterprise = {
    id_empresa: string;
    nome: string;
    porcentagem: number;
    campos_preenchidos: string[];
    campos_faltando: string[];
};

export type EnterprisePhoto = {
    url_foto_empresa: string;
};

export type EnterpriseOverview = {
    id_empresa: string;
    endereco: string;
    historia: string;
    fotos: EnterprisePhoto[];
};