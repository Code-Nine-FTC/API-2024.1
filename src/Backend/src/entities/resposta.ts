import { PrimaryGeneratedColumn, Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import Chamado from "./chamado";

@Entity({name: 'resposta'})
export default class Resposta{

    @PrimaryGeneratedColumn({type: 'int'})
    public resp_id : number

    @Column({type: 'varchar', length: 300})
    public texto: string

    @Column({type: 'boolean'})
    public autoria: boolean

    @Column({type: 'date'})
    public data: Date

    @ManyToOne(() => Chamado, chamado => chamado.respostas)
    @JoinColumn({name: 'cha_id'})
    public chamado: Chamado
}