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
  export class Client extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne( () => User, user => user.id, { onDelete : 'CASCADE'})
    @JoinColumn()
    userId: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    birth: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    height: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    weight: string;
    
}