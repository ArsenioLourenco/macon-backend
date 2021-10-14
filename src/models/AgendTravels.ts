import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Travels } from "./Travels";

@Index("PK__AgendTra__3213E83F63458BA6", ["id"], { unique: true })
@Entity("AgendTravels", { schema: "dbo" })
export class AgendTravels {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "userAgendCode", length: 50 })
  userAgendCode: string;

  @Column("int", { name: "placesReserve" })
  placesReserve: number;

  @Column("varchar", { name: "personalCodeAgend", length: 50 })
  personalCodeAgend: string;

  @Column("text", { name: "notes", nullable: true })
  notes: string | null;

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

  @ManyToOne(() => Travels, (travels) => travels.agendTravels)
  @JoinColumn([{ name: "travelId", referencedColumnName: "id" }])
  travel: Travels;
}
