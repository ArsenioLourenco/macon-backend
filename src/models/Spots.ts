import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Provinces } from "./Provinces";
import { Travels } from "./Travels";

@Index("PK__Spots__3213E83F6A23140C", ["id"], { unique: true })
@Entity("Spots", { schema: "dbo" })
export class Spots {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "spotName", length: 250 })
  spotName: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("text", { name: "location", nullable: true })
  location: string | null;

  @Column("varchar", { name: "contacts", length: 250 })
  contacts: string;

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

  @ManyToOne(() => Provinces, (provinces) => provinces.spots)
  @JoinColumn([{ name: "provinceId", referencedColumnName: "id" }])
  province: Provinces;

  @OneToMany(() => Travels, (travels) => travels.spot)
  travels: Travels[];
}
