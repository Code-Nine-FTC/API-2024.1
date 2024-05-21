export default interface IChamadoView {
    cha_id: number;
    cha_titulo: string;
    cha_descricao: string;
    cha_prioridade: string;
    cha_status: string;
    cha_data_final: Date;
    cha_topico_chamado: string;
    cliente: {
        cli_id: number;
        cli_nome: string;
    };
    funcionario: {
        func_id: number;
        func_nome: string;
    };
    respostas: {
        resp_id: number;
    }[];
}

export default interface IChamadoViewMensagem {
    cha_titulo: string;
    cha_descricao: string;
    cha_prioridade: string;
    cha_status: string;
    cha_data_final: Date;
    cha_data_inicio: Date;
    cha_topico_chamado: string;
    cliente: {
        cli_id: number;
        cli_nome: string;
    };
    funcionario: {
        func_id: number;
        func_nome: string;
    };
    categoria: {
        cat_titulo: string
    }
    respostas: {
        resp_id: number;
    }[];
}


