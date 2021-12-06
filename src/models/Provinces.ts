import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Countries } from "./Countries";
import { Spots } from "./Spots";
import { Travels } from "./Travels";

@Index("PK__Province__3213E83FBAD04A58", ["id"], { unique: true })
@Entity("Provinces", { schema: "dbo" })
export class Provinces {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "ProvinceName", length: 50 })
  provinceName: string;

  @Column("varchar", { name: "region", nullable: true, length: 250 })
  region: string | null;

  @Column("varchar", { name: "codeProvince", length: 50 })
  codeProvince: string;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "NULL",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "NULL",
  })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Countries, (countries) => countries.provinces, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "countryId", referencedColumnName: "id" }])
  country: Countries;

  @ManyToOne(() => Countries, (countries) => countries.provinces2)
  @JoinColumn([{ name: "countryId", referencedColumnName: "id" }])
  country2: Countries;

  @OneToMany(() => Spots, (spots) => spots.province)
  spots: Spots[];

  @OneToMany(() => Travels, (travels) => travels.originProvince)
  travels: Travels[];

  @OneToMany(() => Travels, (travels) => travels.destinyProvince)
  travels2: Travels[];
}
