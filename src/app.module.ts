import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { YachtsModule } from './yachts/yachts.module';
import { BookingModule } from './bookings/booking.module';
import { Pool } from 'pg';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbUrl = configService.get('DATABASE_URL');
        const connectionString = `${dbUrl}?sslmode=require`;
        console.log('Database URL:', connectionString);

        const pool = new Pool({
          connectionString,
          ssl: {
            rejectUnauthorized: false
          },
          connectionTimeoutMillis: 5000,
          keepAlive: true,
          keepAliveInitialDelayMillis: 1000,
        });

        try {
          const client = await pool.connect();
          console.log('Database connection successful');
          client.release();
        } catch (error) {
          console.error('Database connection error:', error);
          throw error;
        }

        return {
          type: 'postgres',
          url: connectionString,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          ssl: {
            rejectUnauthorized: false
          },
          extra: {
            max: 20,
            connectionTimeoutMillis: 5000,
            keepAlive: true,
            keepAliveInitialDelayMillis: 1000,
          },
          retryAttempts: 10,
          retryDelay: 3000,
        };
      },
      inject: [ConfigService],
    }),
    BookingModule,
    YachtsModule,
  ],
})
export class AppModule {}
