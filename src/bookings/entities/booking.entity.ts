import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'uuid', nullable: true })
    user_id: string | null;

    @Column({ type: 'bigint', nullable: true })
    yacht_id: number | null;

    @Column({ type: 'timestamptz' })
    booking_date: Date;

    @Column({ type: 'text', nullable: true })
    status: string;

    @Column({ type: 'numeric' })
    total_price: number;

    @Column({ type: 'int' })
    number_of_guests: number;

    @Column({ type: 'text', nullable: true })
    special_requests: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @Column({ type: 'text' })
    service_type: string;

    @Column({ type: 'text', nullable: true })
    flight_number: string;

    @Column({ type: 'text', nullable: true })
    flight_from: string;

    @Column({ type: 'text', nullable: true })
    flight_to: string;

    @Column({ type: 'timestamp', nullable: true })
    departure_date: Date;

    @Column({ type: 'text', nullable: true })
    airline: string;

    @Column({ type: 'text', nullable: true })
    customer_name: string;

    @Column({ type: 'text', nullable: true })
    customer_email: string;

    @Column({ type: 'text', nullable: true })
    customer_phone: string;
} 