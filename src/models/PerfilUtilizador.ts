import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Utilizadores } from "./Utilizadores";

@Index("PK__perfil_u__1D1C87689CAA77F4", ["idPerfil"], { unique: true })
@Entity("perfil_utilizador", { schema: "dbo" })
export class PerfilUtilizador {
  @PrimaryGeneratedColumn({ type: "int", name: "id_perfil" })
  idPerfil: number;

  @Column("varchar", { name: "designacao", length: 250 })
  designacao: string;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "sysdatetime()",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "sysdatetime()",
  })
  updatedAt: Date | null;

  @OneToMany(() => Utilizadores, (utilizadores) => utilizadores.idPerfil)
  utilizadores: Utilizadores[];
}
