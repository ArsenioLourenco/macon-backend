import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Travels } from "./Travels";
import { Payment } from "./Payment";

@Index("PK__AgendTra__3213E83FC85E6B97", ["id"], { unique: true })
@Entity("AgendTravels", { schema: "dbo" })
export class AgendTravels {
  execute(arg0: { placesReserve: any; travelId: any; phoneNumber: any; email: any; }) {
      throw new Error("Method not implemented.");
  }
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
    default: () => "NULL",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "NULL",
  })
  updatedAt: Date | null;

  @Column("varchar", { name: "phoneNumber", nullable: true, length: 50 })
  phoneNumber: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 50 })
  status: string | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Travels, (travels) => travels.agendTravels, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "travelId", referencedColumnName: "id" }])
  travel: Travels;

  @OneToMany(() => Payment, (payment) => payment.agendTravelCode)
  payments: Payment[];
}
