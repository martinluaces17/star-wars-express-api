import {
    Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable
  } from 'typeorm';
  
import { Personajes } from "./Personajes"
import { Planetas } from "./Planetas"


  @Entity()
  export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    first_name: string;
  
    @Column()
    last_name: string;
  
    @Column({unique: true})
    email: string;
  
    @Column({unique: true})
    password: string;
  
       @ManyToMany(()=> Personajes)
      @JoinTable()
      Personajes: Personajes[]

     @ManyToMany(()=> Planetas)
      @JoinTable()
      Planetas: Planetas[]
    
  }