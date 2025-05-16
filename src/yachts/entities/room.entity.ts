import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Yacht } from './yacht.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  price: number;

  @Column('int')
  max_guests: number;

  @Column('int', { nullable: true })
  area: number;

  @ManyToOne(() => Yacht, yacht => yacht.rooms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'yacht_id' })
  yacht: Yacht;
} 