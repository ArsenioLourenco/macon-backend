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
    default: () => "getdate()",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "getdate()",
  })
  updatedAt: Date | null;

  @ManyToOne(() => Countries, (countries) => countries.provinces)
  @JoinColumn([{ name: "countryId", referencedColumnName: "id" }])
  countryID: Countries;

  @OneToMany(() => Spots, (spots) => spots.provinceID)
  spots: Spots[];

  @OneToMany(() => Travels, (travels) => travels.origin)
  travels: Travels[];

  @OneToMany(() => Travels, (travels) => travels.destiny)
  travels2: Travels[];
}
