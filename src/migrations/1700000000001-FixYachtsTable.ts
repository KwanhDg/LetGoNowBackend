import { MigrationInterface, QueryRunner } from "typeorm";

export class FixYachtsTable1700000000001 implements MigrationInterface {
    name = 'FixYachtsTable1700000000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Kiểm tra xem bảng yachts có tồn tại không
        const tableExists = await queryRunner.hasTable('yachts');
        
        if (!tableExists) {
            // Nếu bảng không tồn tại, tạo mới
            await queryRunner.query(`
                CREATE TABLE "yachts" (
                    "id" SERIAL NOT NULL,
                    "name" character varying NOT NULL,
                    "description" text,
                    "price_per_day" numeric(10,2) NULL,
                    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                    CONSTRAINT "PK_yachts" PRIMARY KEY ("id")
                )
            `);
        } else {
            // Nếu bảng tồn tại, kiểm tra và thêm cột price_per_day nếu chưa có
            const hasColumn = await queryRunner.hasColumn('yachts', 'price_per_day');
            if (!hasColumn) {
                await queryRunner.query(`
                    ALTER TABLE "yachts" 
                    ADD COLUMN "price_per_day" numeric(10,2) NULL
                `);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Không cần rollback vì đây là migration sửa lỗi
    }
} 