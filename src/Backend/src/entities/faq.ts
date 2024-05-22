import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn } from "typeorm";

@Entity({name: 'faq'})
export default class Faq {
    @PrimaryGeneratedColumn({type: 'int'})
    public faq_id: number;

    @CreateDateColumn({ type: 'timestamp' })
    public faq_data_modificacao: Date;

    @Column({type: 'varchar', length: 300})
    public faq_exemplo: string;

    @Column({type:'varchar', length: 50})
    public faq_titulo: string;

    @Column({type: 'varchar', length: 300})
    public faq_descricao: string;
}
