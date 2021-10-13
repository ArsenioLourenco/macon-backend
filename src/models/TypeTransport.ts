import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tranpsort } from "./Tranpsort";

@Index("PK__TypeTran__3213E83F4664E4E9", ["id"], { unique: true })
@Entity("TypeTransport", { schema: "dbo" })
export class TypeTransport {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "typeName", length: 250 })
  typeName: string;

  @Column("text", { name: "Description", nullable: true })
  description: string | null;

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

  @OneToMany(() => Tranpsort, (tranpsort) => tranpsort.typeTransport)
  tranpsorts: Tranpsort[];
}
