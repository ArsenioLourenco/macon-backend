import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Index("PK", ["id"], { unique: true })
@Entity("country", { schema: "dbo" })
export class Province {

    @PrimaryGeneratedColumn({ type: "int", name: "countryID" })
    id: number;

    @Column({type: "string", name: "ProvinceName"})
    province: string;

    @Column({type: "string", name: "codeProvince"})
    code: string;

    @Column({type: "string", name: "region"})
    region?: string;

    @Column({type: "string", name: "countryId"})
    countryID: string;

    @Column({
        type: "datetime",
        name: "created_at",
        nullable: true,
        default: () => "sysdatetimw("
    })
    created_at: Date | null;

    @Column({ type: "datetime", 
    name: "updated_at", 
    nullable: true, 
    default: () => "sysdatetimw(" })
    updated_at: Date | null;

}