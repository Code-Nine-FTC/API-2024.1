import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne, BeforeInsert } from "typeorm";
import Cliente from "./cliente";
import Funcionario from "./funcionario";
import Resposta from "./resposta";
import Categoria from "./categoria"; 

@Entity({ name: 'chamado' })
export default class Chamado {

    @PrimaryGeneratedColumn({ type: 'int' })
    public cha_id: number

    @Column({ type: 'varchar', length: 100 })
    public cha_titulo: string

    @Column({ type: 'varchar', length: 300 })
    public cha_descricao: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) 
    public cha_data_inicio: Date;    

    @Column({ type: 'date', nullable: true })
    public cha_data_final: Date | null    

    @Column({ type: 'varchar', length: 100, default: 'Em Aberto' })
    public cha_status: string

    @Column({ type: 'varchar', nullable: true })
    public cha_prioridade: string

    @ManyToOne(() => Cliente, cliente => cliente.chamado)
    @JoinColumn({ name: 'cli_id' })
    public cliente: Cliente

    @ManyToOne(() => Funcionario, funcionario => funcionario.chamado, { nullable: true })
    @JoinColumn({ name: 'func_id' })
    public funcionario: Funcionario

    @ManyToOne(() => Categoria, categoria => categoria.chamados) 
    @JoinColumn({ name: 'cat_id' })
    public categoria: Categoria

    @OneToMany(() => Resposta, resposta => resposta.chamado)
    public respostas: Resposta[];

}
