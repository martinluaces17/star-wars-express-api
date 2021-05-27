import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinColumn, OneToMany, JoinTable } from "typeorm"
import { User } from "./User"
import { Personajes } from "./Personajes"

@Entity()
export class Planetas extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    nombre: string

    @Column()
    diametro: number;

    @Column()
    periodo_de_rotacion: number;

    @Column()
    gravedad: string;

    @Column()
    poblacion: number;

    @Column()
    terreno: string;

    @Column()
    img_url: string;

   @OneToMany(() => Personajes, personajes => personajes.planetas)
    personajes: Personajes;

}