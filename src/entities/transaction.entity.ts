import { Column, Entity, JoinColumn, Long, OneToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { ProductEntity } from "./product.entity";

@Entity({ name: "transaction" })
export class TransactionEntity {
  @PrimaryColumn("varchar", { length: 100 })
  transactionId: string;

  @Column("long")
  quantity: Long;

  @Column("varchar", {length: 7})
  typetransaction: string;

  @OneToOne(() => ProductEntity, (product) => product.productId, {onDelete:"CASCADE", cascade: true})
  @JoinColumn({ name: "productId" })
  product: ProductEntity;

  @OneToOne(() => UserEntity, (user) => user.userId,  {onDelete:"CASCADE", cascade: true})
  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
