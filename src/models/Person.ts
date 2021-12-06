import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./Profile";

@Index("PK__Person__3213E83FE5F1E12D", ["id"], { unique: true })
@Index("UQ__Person__3214B5DAF09B20D4", ["bi"], { unique: true })
@Entity("Person", { schema: "dbo" })
export class Person {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "firstName", nullable: true, length: 250 })
  firstName: string | null;

  @Column("varchar", { name: "lastName", nullable: true, length: 250 })
  lastName: string | null;

  @Column("varchar", { name: "completeName", length: 50 })
  completeName: string;

  @Column("varchar", { name: "BI", nullable: true, unique: true, length: 50 })
  bi: string | null;

  @Column("date", { name: "birthDate", nullable: true })
  birthDate: Date | null;

  @Column("int", { name: "userId", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "phoneNumber", nullable: true, length: 150 })
  phoneNumber: string | null;

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

  @ManyToOne(() => Profile, (profile) => profile.people)
  @JoinColumn([{ name: "typeProfileId", referencedColumnName: "id" }])
  typeProfile: Profile;
}
