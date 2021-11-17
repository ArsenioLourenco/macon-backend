import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Provinces } from "./Provinces";

@Index("PK__Countrie__3213E83FD00E5B26", ["id"], { unique: true })
@Entity("Countries", { schema: "dbo" })
export class Countries {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "countryName", unique: true, length: 50 })
  countryName: string;

  @Column("varchar", { name: "region", nullable: true, length: 250 })
  region: string | null;

  @Column("varchar", { name: "codeCountry", length: 50 })
  codeCountry: string;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "getdate()",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "getdate()",
  })
  updatedAt: Date | null;

  @Column("datetime", {
    name: "deleted_at",
    nullable: true,
    default: () => "getdate()",
  })
  deletedAt: Date | null;

  @OneToMany(() => Provinces, (provinces) => provinces.country)
  provinces: Provinces[];

  @OneToMany(() => Provinces, (provinces) => provinces.country2)
  provinces2: Provinces[];
}
