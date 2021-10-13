import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Index("PK", ["provinceID"], { unique: true })
@Entity("country", { schema: "dbo" })
export class Province {

    @PrimaryGeneratedColumn({ type: "int", name: "countryID" })
    id: number;

    @Column({type: "varchar", name: "spotName"})
    spot: string;

    @Column({type: "varchar", name: "description"})
    description: string;

    @Column({type: "varchar", name: "location"})
    location: string;

    @Column({type: "int", name: "contacts"})
    contact: number;

    @Column({type: "int", name: "provinceId"})
    provinceId?: number;

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