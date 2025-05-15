import { MigrationInterface, QueryRunner } from "typeorm";

export class AddYachtFields1747187157957 implements MigrationInterface {
    name = 'AddYachtFields1747187157957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Kiểm tra và thêm các cột nếu chưa tồn tại
        const table = await queryRunner.getTable("yachts");
        
        if (!table.findColumnByName("status")) {
            await queryRunner.query(`ALTER TABLE "yachts" ADD "status" character varying(50)`);
        }
        
        if (!table.findColumnByName("rating")) {
            await queryRunner.query(`ALTER TABLE "yachts" ADD "rating" numeric(3,2)`);
        }
        
        if (!table.findColumnByName("review_count")) {
            await queryRunner.query(`ALTER TABLE "yachts" ADD "review_count" integer`);
        }
        
        if (!table.findColumnByName("location")) {
            await queryRunner.query(`ALTER TABLE "yachts" ADD "location" character varying(255)`);
        }
        
        if (!table.findColumnByName("launch_year")) {
            await queryRunner.query(`ALTER TABLE "yachts" ADD "launch_year" integer`);
        }
        
        if (!table.findColumnByName("ship_type")) {
            await queryRunner.query(`ALTER TABLE "yachts" ADD "ship_type" character varying(100)`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("yachts");
        
        if (table.findColumnByName("ship_type")) {
            await queryRunner.query(`ALTER TABLE "yachts" DROP COLUMN "ship_type"`);
        }
        
        if (table.findColumnByName("launch_year")) {
            await queryRunner.query(`ALTER TABLE "yachts" DROP COLUMN "launch_year"`);
        }
        
        if (table.findColumnByName("location")) {
            await queryRunner.query(`ALTER TABLE "yachts" DROP COLUMN "location"`);
        }
        
        if (table.findColumnByName("review_count")) {
            await queryRunner.query(`ALTER TABLE "yachts" DROP COLUMN "review_count"`);
        }
        
        if (table.findColumnByName("rating")) {
            await queryRunner.query(`ALTER TABLE "yachts" DROP COLUMN "rating"`);
        }
        
        if (table.findColumnByName("status")) {
            await queryRunner.query(`ALTER TABLE "yachts" DROP COLUMN "status"`);
        }
    }
}
