create table cliente(
	cli_id int primary key auto_increment,
    cli_email varchar(255) unique,
    cli_nome varchar(40),
    cli_cpf varchar(11) not null unique,
    cli_senha varchar(255) not null
    );
    

create table funcionario(
	func_id int primary key auto_increment,
	func_nome varchar(100),
    func_cpf varchar(20) unique,
    func_email varchar(100),
    func_telefone int(15),
    func_senha varchar(20),
    func_horario date,
    func_nivel varchar(20)
    );
    
    
/* create table relatorio(
	rel_id int primary key auto_increment,
    rel_tipo varchar(20),
    rel_titulo varchar(40),
    rel_corpo_texto varchar(500),
    atd_email varchar(255) unique,
    chm_id int,
    foreign key(atd_email) references atendente(atd_email),
    foreign key(chm_id) references chamado(chm_id)
    );
    */
    
create table resposta(
	resp_id int primary key auto_increment,
    resp_mensagem_resposta varchar(300),
    resp_autor_resposta varchar(20),
    resp_data_resposta date,
    cha_id int,
    foreign key (cha_id) references chamado (cha_id)
    );
    
create table chamado(
	cha_id int primary key auto_increment,
    cha_titulo varchar(100),
    cha_descricao varchar(300),
    cha_prioridade varchar(20),
    cha_status varchar(20) not null, 
    cha_data_final date,
    cha_data_inicio date,
    cha_topico_chamado varchar(100),
    cli_id int, 
    func_id int,
    resp_id int,
    foreign key (cli_id) references cliente (cli_id),
    foreign key (func_id) references funcionario (func_id),
    foreign key (resp_id) references resposta (resp_id)
    );
    
    create table faq(
    faq_id int primary key auto_increment,
    faq_data_modificacao date,
    faq_exemplo varchar(300),
    faq_titulo varchar(50),
    faq_descricao varchar(300)
    );