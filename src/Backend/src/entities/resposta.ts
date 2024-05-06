import { PrimaryGeneratedColumn, Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import Chamado from "./chamado";

@Entity({name: 'resposta'})
export default class Resposta{

    @PrimaryGeneratedColumn({type: 'int'})
    public resp_id : number

    @Column({type: 'varchar', length: 300})
    public resp_mensagem_reposta: string

    @Column({type: 'boolean'})
    public resp_feita_por_atendente: boolean

    @Column({type: 'date'})
    public resp_data_resposta: Date

    @ManyToOne(() => Chamado, chamado => chamado.respostas)
    @JoinColumn({name: 'cha_id'})
    public chamado: Chamado
}