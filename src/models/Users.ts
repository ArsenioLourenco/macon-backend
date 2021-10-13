import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./Profile";

@Index("PK__Users__3213E83FD9EAB029", ["id"], { unique: true })
@Entity("Users", { schema: "dbo" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", length: 250 })
  username: string;

  @Column("varchar", { name: "code", length: 50 })
  code: string;

  @Column("varchar", { name: "password", length: 250 })
  password: string;

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

  @ManyToOne(() => Profile, (profile) => profile.users)
  @JoinColumn([{ name: "profileId", referencedColumnName: "id" }])
  profile: Profile;
}
