import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { Planetas } from "./Planetas"

@Entity()
export class Personajes extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    nombre: string

    @Column()
    altura: string;

    @Column()
    peso: string;

    @Column()
    color_de_piel: string;

    @Column()
    fecha_nacimiento: string;

    @Column()
    descripcion: string;

    @Column()
    img_url: string;

    @ManyToOne(() => Planetas, planetas => planetas.personajes)
    planetas: Planetas;
}