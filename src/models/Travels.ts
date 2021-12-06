import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AgendTravels } from "./AgendTravels";
import { Spots } from "./Spots";
import { Provinces } from "./Provinces";
import { Transport } from "./Transport";

@Index("Travels_PK", ["id"], { unique: true })
@Entity("Travels", { schema: "dbo" })
export class Travels {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "departureDate", nullable: true })
  departureDate: Date | null;

  @Column("date", { name: "returnDate", nullable: true })
  returnDate: Date | null;

  @Column("time", { name: "timeToGoTo", nullable: true })
  timeToGoTo: Date | null;

  @Column("time", { name: "timeToArrival", nullable: true })
  timeToArrival: Date | null;

  @Column("varchar", { name: "observations", nullable: true, length: 255 })
  observations: string | null;

  @Column("int", { name: "price" })
  price: number;

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

  @OneToMany(() => AgendTravels, (agendTravels) => agendTravels.travel)
  agendTravels: AgendTravels[];

  @ManyToOne(() => Spots, (spots) => spots.travels, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "spotId", referencedColumnName: "id" }])
  spot: Spots;

  @ManyToOne(() => Provinces, (provinces) => provinces.travels, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "originProvince", referencedColumnName: "id" }])
  originProvince: Provinces;

  @ManyToOne(() => Provinces, (provinces) => provinces.travels2)
  @JoinColumn([{ name: "destinyProvince", referencedColumnName: "id" }])
  destinyProvince: Provinces;

  @ManyToOne(() => Transport, (transport) => transport.travels, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "transportId", referencedColumnName: "id" }])
  transport: Transport;
}
