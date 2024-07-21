import { Entity, Column, PrimaryGeneratedColumn, OneToMany,CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { CartItem } from './cart-item.entity';

export enum CartStatuses {
  OPEN = 'OPEN',
  STATUS = 'STATUS'
}

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'uuid'})
  user_id: string;

  //TODO: remove commented code
  // @Column({ type: 'varchar', length: 255 })
  // created_at: string;

  // @Column({ type: 'varchar', length: 255 })
  // updated_at: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: CartStatuses,
    default: CartStatuses.OPEN
  })
  status: CartStatuses;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}
