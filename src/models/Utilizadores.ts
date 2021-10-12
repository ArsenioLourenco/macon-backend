import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PerfilUtilizador } from "./PerfilUtilizador";

@Index("PK__utilizad__3213E83F88F212CB", ["id"], { unique: true })
@Index("UQ__utilizad__FBAF1E87CA7C164F", ["emailUtilizador"], { unique: true })
@Entity("utilizadores", { schema: "dbo" })
export class Utilizadores {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nome_utilizador", length: 250 })
  nomeUtilizador: string;

  @Column("varchar", { name: "senha_utilizador", length: 100 })
  senhaUtilizador: string;

  @Column("varchar", { name: "email_utilizador", unique: true, length: 250 })
  emailUtilizador: string;

  @Column("varchar", { name: "id_utilizador", length: 50 })
  idUtilizador: string;

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

  @ManyToOne(
    () => PerfilUtilizador,
    (perfilUtilizador) => perfilUtilizador.utilizadores
  )
  @JoinColumn([{ name: "id_perfil", referencedColumnName: "idPerfil" }])
  idPerfil: PerfilUtilizador;
}
