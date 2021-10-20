/* eslint-disable prettier/prettier */
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../users/user.entity'
  @Entity()
  export class Doctor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne( () => User, user => user.id, { onDelete : 'CASCADE'})
    @JoinColumn()
    userId: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    registro: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    especialidade: string;

}
  