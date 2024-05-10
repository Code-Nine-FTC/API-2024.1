import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";


@Entity({name: 'categoria'})
export default class Categoria{

    @PrimaryGeneratedColumn({type: 'int'})
    public cat_id : number

    @Column({type: 'varchar', length: 300})
    public cat_titulo: string

    @Column({type: 'time'})
    public cat_horario: string
    
    @Column({type: 'varchar', length: 10})
    public cat_prioridade: string
}
