import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { YachtsModule } from './yachts/yachts.module';
import { BookingModule } from './bookings/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get('DATABASE_URL');
        if (dbUrl) {
          return {
            type: 'postgres',
            url: dbUrl,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            ssl: {
              rejectUnauthorized: false
            },
            extra: {
              max: 20,
              connectionTimeoutMillis: 5000,
            },
            retryAttempts: 10,
            retryDelay: 3000,
          };
        }
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          ssl: {
            rejectUnauthorized: false
          },
          extra: {
            max: 20,
            connectionTimeoutMillis: 5000,
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
