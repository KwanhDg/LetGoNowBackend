import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateYachtsTable1700000000000 implements MigrationInterface {
    name = 'CreateYachtsTable1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "yachts" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" text,
                "price_per_day" numeric(10,2) NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_yachts" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "yachts"`);
    }
} 