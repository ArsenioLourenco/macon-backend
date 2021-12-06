import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Person } from "./Person";
import { Users } from "./Users";

@Index("PK__Profile__3213E83FA4D9CC8E", ["id"], { unique: true })
@Entity("Profile", { schema: "dbo" })
export class Profile {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "profileName", length: 250 })
  profileName: string;

  @Column("text", { name: "Description", nullable: true })
  description: string | null;

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

  @OneToMany(() => Person, (person) => person.typeProfile)
  people: Person[];

  @OneToMany(() => Users, (users) => users.profile)
  users: Users[];
}
