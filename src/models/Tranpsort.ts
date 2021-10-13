import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TypeTransport } from "./TypeTransport";

@Index("PK__Tranpsor__3213E83FC529A64A", ["id"], { unique: true })
@Entity("Tranpsort", { schema: "dbo" })
export class Tranpsort {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "transportName", length: 50 })
  transportName: string;

  @Column("int", { name: "transportNumber", nullable: true })
  transportNumber: number | null;

  @Column("int", { name: "totalPlace", nullable: true })
  totalPlace: number | null;

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

  @ManyToOne(() => TypeTransport, (typeTransport) => typeTransport.tranpsorts)
  @JoinColumn([{ name: "typeTransportId", referencedColumnName: "id" }])
  typeTransport: TypeTransport;
}
