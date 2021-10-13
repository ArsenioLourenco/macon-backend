import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TypeTransport } from "./TypeTransport";

@Index("PK__Person__3213E83FD39770B4", ["id"], { unique: true })
@Entity("Person", { schema: "dbo" })
export class Person {
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

  @ManyToOne(() => TypeTransport, (typeTransport) => typeTransport.people)
  @JoinColumn([{ name: "typeTransportId", referencedColumnName: "id" }])
  typeTransport: TypeTransport;
}
