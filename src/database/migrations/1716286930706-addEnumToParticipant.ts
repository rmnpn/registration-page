import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnumToParticipant1716286930706 implements MigrationInterface {
    name = 'AddEnumToParticipant1716286930706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "infoAboutEvent"`);
        await queryRunner.query(`CREATE TYPE "public"."participants_infoaboutevent_enum" AS ENUM('Social media', 'friends', 'found myself')`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "infoAboutEvent" "public"."participants_infoaboutevent_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "infoAboutEvent"`);
        await queryRunner.query(`DROP TYPE "public"."participants_infoaboutevent_enum"`);
        await queryRunner.query(`ALTER TABLE "participants" ADD "infoAboutEvent" text NOT NULL`);
    }

}
