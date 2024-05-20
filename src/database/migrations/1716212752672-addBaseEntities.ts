import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1716212752672 implements MigrationInterface {
    name = 'AddBaseEntities1716212752672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text NOT NULL, "event_date" date NOT NULL, "organizer" text NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "fullname" text NOT NULL, "email" text NOT NULL, "dateOfBirth" date NOT NULL, "infoAboutEvent" text NOT NULL, CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events_participants_participants" ("eventsId" uuid NOT NULL, "participantsId" uuid NOT NULL, CONSTRAINT "PK_85e21666ca832644af4863092b7" PRIMARY KEY ("eventsId", "participantsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0b222350424472c842caecbdbd" ON "events_participants_participants" ("eventsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8b1f6a3df1888f7016e47f77b7" ON "events_participants_participants" ("participantsId") `);
        await queryRunner.query(`ALTER TABLE "events_participants_participants" ADD CONSTRAINT "FK_0b222350424472c842caecbdbdb" FOREIGN KEY ("eventsId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "events_participants_participants" ADD CONSTRAINT "FK_8b1f6a3df1888f7016e47f77b78" FOREIGN KEY ("participantsId") REFERENCES "participants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events_participants_participants" DROP CONSTRAINT "FK_8b1f6a3df1888f7016e47f77b78"`);
        await queryRunner.query(`ALTER TABLE "events_participants_participants" DROP CONSTRAINT "FK_0b222350424472c842caecbdbdb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b1f6a3df1888f7016e47f77b7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0b222350424472c842caecbdbd"`);
        await queryRunner.query(`DROP TABLE "events_participants_participants"`);
        await queryRunner.query(`DROP TABLE "participants"`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
