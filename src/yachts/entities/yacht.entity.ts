import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('yachts')
export class Yacht {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    price: number;

    @Column({ type: 'jsonb', nullable: true })
    images: string[];

    @Column({ type: 'varchar', length: 50, nullable: true })
    status: string;

    @Column({ type: 'numeric', precision: 3, scale: 2, nullable: true })
    rating: number;

    @Column({ type: 'int', nullable: true })
    review_count: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    location: string;

    @Column({ type: 'int', nullable: true })
    launch_year: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    ship_type: string;

    @Column({ type: 'jsonb', nullable: true })
    facilities: string[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 