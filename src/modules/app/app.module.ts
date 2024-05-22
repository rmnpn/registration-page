import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../configs/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config, PostgresConfig } from '../../configs/config.type';
import { ParticipantModule } from '../ participant/participant.module';
import { EventModule } from '../event/event.module';
import * as path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => {
        const postgresConfigs = configService.get<PostgresConfig>('postgres');
        return {
          type: 'postgres',
          host: postgresConfigs.host,
          port: postgresConfigs.port,
          username: postgresConfigs.user,
          password: postgresConfigs.password,
          database: postgresConfigs.dbName,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'entities',
              '*.entity.js',
            ),
          ],
          migrations: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'migrations',
              '*.js',
            ),
          ],
        };
      },
    }),
    ParticipantModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
