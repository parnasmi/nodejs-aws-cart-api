import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: ['OPEN', 'ORDERED'],
  })
  status: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}
