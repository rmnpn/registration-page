import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../configs/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config, PostgresConfig } from '../../configs/config.type';

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
          entities: [],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
