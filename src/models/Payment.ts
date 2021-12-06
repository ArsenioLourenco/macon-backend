import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AgendTravels } from "./AgendTravels";

@Index("PK__Payment__3213E83FC6F78009", ["id"], { unique: true })
@Entity("Payment", { schema: "dbo" })
export class Payment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "paymentReference", length: 50 })
  paymentReference: string;

  @Column("varchar", { name: "status", length: 50 })
  status: string;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "getdate()",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deletet_at", nullable: true })
  deletetAt: Date | null;

  @ManyToOne(() => AgendTravels, (agendTravels) => agendTravels.payments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "agendTravelCode", referencedColumnName: "id" }])
  agendTravelCode: AgendTravels;
}
