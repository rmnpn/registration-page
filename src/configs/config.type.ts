export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
};
export type AppConfig = {
  port: number;
  host: string;
};
export type PostgresConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
};
