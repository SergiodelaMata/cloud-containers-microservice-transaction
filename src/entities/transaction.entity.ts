import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "transaction" })
export class TransactionEntity {
  @PrimaryColumn("varchar", { length: 100 })
  transactionId: string;

  @Column("int")
  quantity: number;

  @Column("varchar", {length: 7})
  price: string;

  @Column("varchar", {length: 7})
  typetransaction: string;

  @Column("datetime")
  datetransaction: Date;

  @Column("varchar", { length: 100, nullable: true})
  productId: string;

  @Column("varchar", { length: 100, nullable: true })
  userId: string;

}

