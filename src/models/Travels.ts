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
import { Provinces } from "./Provinces";
import { Spots } from "./Spots";

@Index("PK__Travels__3213E83F27535BEF", ["id"], { unique: true })
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

  @Column("int", { name: "typeTransportId", nullable: true })
  typeTransportId: number | null;

  @Column("text", { name: "observations", nullable: true })
  observations: string | null;

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

  @OneToMany(() => AgendTravels, (agendTravels) => agendTravels.travel)
  agendTravels: AgendTravels[];

  @ManyToOne(() => Provinces, (provinces) => provinces.travels)
  @JoinColumn([{ name: "origin", referencedColumnName: "id" }])
  origin: Provinces;

  @ManyToOne(() => Provinces, (provinces) => provinces.travels2)
  @JoinColumn([{ name: "destiny", referencedColumnName: "id" }])
  destiny: Provinces;

  @ManyToOne(() => Spots, (spots) => spots.travels)
  @JoinColumn([{ name: "spotId", referencedColumnName: "id" }])
  spot: Spots;
}
