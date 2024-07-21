import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

export enum CartStatuses {
  OPEN = 'OPEN',
  STATUS = 'STATUS'
}

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column({
    type: 'enum',
    enum: CartStatuses,
  })
  status: CartStatuses;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}
