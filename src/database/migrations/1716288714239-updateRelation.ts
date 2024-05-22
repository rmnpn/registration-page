import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelation1716288714239 implements MigrationInterface {
    name = 'UpdateRelation1716288714239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" ADD "eventId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "eventId" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "eventId"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "eventId"`);
    }

}
