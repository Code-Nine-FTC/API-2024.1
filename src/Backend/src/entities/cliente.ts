import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";
import Chamado from "./chamado";

@Entity({name : 'cliente'})
export default class Cliente {

    @PrimaryGeneratedColumn({ type:'int'})
    public cli_id: number

    @Column({ type: 'varchar', length: 255, unique: true })
    public cli_email: string

    @Column({ type: 'varchar', length:40 })
    public cli_nome: string

    @Column({ type: 'varchar', length: 11, unique: true, nullable: false})
    public cli_cpf: string

    @Column({ type: 'varchar', length: 20, nullable: false})
    public cli_senha: string

    @Column({ type: 'boolean', default: true }) 
    public ativo: boolean;

    @OneToMany(() => Chamado, chamado => chamado.cliente)
    public chamado: Chamado[]
}