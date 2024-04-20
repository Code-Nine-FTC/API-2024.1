import { Column, Entity,  PrimaryGeneratedColumn,OneToMany, ManyToOne, JoinColumn } from "typeorm";
import Cliente from "./cliente";
import Funcionario from "./funcionario";
import Resposta from "./resposta";

@Entity({ name: 'chamado' })
export default class Chamado {

    @PrimaryGeneratedColumn({ type: 'int' })
    public cha_id: number

    @Column({ type: 'varchar', length: 100 })
    public cha_titulo: string

    @Column({ type: 'varchar', length: 300 })
    public cha_descricao: string

    @Column({ type: 'varchar', length: 20 })
    public cha_prioridade: string

    @Column({ type: 'varchar', length: 20, nullable: false })
    public cha_status: string

    @Column({ type: 'date' })
    public cha_data_final: Date

    @Column({ type: 'date' })
    public cha_data_inicio: Date

    @Column({ type: 'varchar', length: 100 })
    public cha_topico_chamado: string

    @ManyToOne(() => Cliente, cliente => cliente.chamado)
    @JoinColumn({ name: 'cli_id' })
    public cliente: Cliente

    @ManyToOne(() => Funcionario, funcionario => funcionario.chamado)
    @JoinColumn({ name: 'func_id' })
    public funcionario: Funcionario

    @OneToMany(() => Resposta, resposta => resposta.chamado)
    public respostas: Resposta[];
}