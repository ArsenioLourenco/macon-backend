import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';

@Index("PK", ["id"], { unique: true })
@Entity("country", { schema: "dbo" })
export class Country {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    region?: string;

    // @OneToMany(()=> )
    countryID: string;
}