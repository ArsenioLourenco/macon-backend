import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
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

  @Column("date", { name: "departureDate" })
  departureDate: Date;

  @Column("date", { name: "returnDate" })
  returnDate: Date;

  @Column("time", { name: "timeToGoTo", nullable: true })
  timeToGoTo: Date | null;

  @Column("time", { name: "timeToArrival", nullable: true })
  timeToArrival: Date | null;

  @Column("varchar", { name: "observations", nullable: true, length: 50 })
  observations: string;

  @Column("datetime", { name: "created_at", nullable: false })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: false })
  updatedAt: Date | null;

  @Column("int", { name: "price" })
  price: number;

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
