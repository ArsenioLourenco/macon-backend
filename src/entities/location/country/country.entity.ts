import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';

@Index("PK", ["id"], { unique: true })
@Entity("country", { schema: "dbo" })
export class Country {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column({type: "string", name: "countryName"})
    country: string;

    @Column({type: "string", name: "odeCountry"})
    code: string;

    @Column({type: "string", name: "region"})
    region?: string;

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