import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";
import Chamado from "./chamado";

@Entity({name: 'categoria'})
export default class Categoria{

    @PrimaryGeneratedColumn({type: 'int'})
    public cat_id : number

    @Column({type: 'varchar', length: 300, nullable: false})
    public cat_titulo: string

    @Column({type: 'time', nullable: false})
    public cat_horario: string
    
    @Column({type: 'varchar', length: 100, nullable:false})
    public cat_prioridade: string

    @OneToMany(()=> Chamado,chamado => chamado.categoria)
    public chamados: Chamado[]
}
