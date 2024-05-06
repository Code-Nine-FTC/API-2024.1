import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";
import Chamado from "./chamado";

@Entity({name: 'funcionario'})
export default class Funcionario{

    @PrimaryGeneratedColumn({ type:'int'})
    public func_id : number

    @Column({type: 'varchar', length: 100})
    public func_nome: string

    @Column({type: 'varchar', length: 11})
    public func_cpf: string

    @Column({type:'varchar', length: 100})
    public func_email:string

    @Column({type:'varchar', length: 255})
    public func_senha: string

    @Column({type: 'time'})
    public func_expediente_inicio: string

    @Column({type: 'time'})
    public func_expediente_final: string

    @Column({type: 'boolean', default: false})
    public func_is_admin: boolean

    @Column({ type: 'boolean', default: true }) 
    public ativo: boolean;

    @OneToMany(() => Chamado, chamado => chamado.funcionario)
    public chamado : Chamado[]
}