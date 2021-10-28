/* eslint-disable prettier/prettier */
import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Agenda extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 64 })
    clientId: string;

    @Column({ nullable: false, type: 'varchar', length: 64 })
    doctorId: string;
  
    @Column({ nullable: false })
    min: Date;

    @Column({ nullable: false })
    max: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  