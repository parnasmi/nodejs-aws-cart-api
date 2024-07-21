import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Cart } from '../models/cart.entity';
import { CartItem } from '../models/cart-item.entity';

// import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}
  
  //TODO: remove commented code
  // private userCarts: Record<string, Cart> = {};

  // findByUserId(userId: string): Cart {
  //   return this.userCarts[ userId ];
  // }

  async findByUserId(userId: string): Promise<Cart> {
    return this.cartRepository.findOne({ where: { user_id: userId }, relations: ['items'] });
  }

  // createByUserId(userId: string) {
  //   const id = uuidv4();
  //   const userCart = {
  //     id,
  //     items: [],
  //   } as Cart;

  //   this.userCarts[ userId ] = userCart;

  //   return userCart;
  // }

  async createByUserId(userId: string): Promise<Cart> {
    const cart = new Cart();
    cart.id = uuidv4();
    cart.user_id = userId;
    cart.created_at = new Date();
    cart.updated_at = new Date();
    cart.status = 'OPEN';
    cart.items = [];

    return this.cartRepository.save(cart);
  }

  // findOrCreateByUserId(userId: string): Cart {
  //   const userCart = this.findByUserId(userId);

  //   if (userCart) {
  //     return userCart;
  //   }

  //   return this.createByUserId(userId);
  // }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    let cart = await this.findByUserId(userId);

    if (!cart) {
      cart = await this.createByUserId(userId);
    }

    return cart;
  }

  // updateByUserId(userId: string, { items }: Cart): Cart {
  //   const { id, ...rest } = this.findOrCreateByUserId(userId);

  //   const updatedCart = {
  //     id,
  //     ...rest,
  //     items: [ ...items ],
  //   }

  //   this.userCarts[ userId ] = { ...updatedCart };

  //   return { ...updatedCart };
  // }

  async updateByUserId(userId: string, items: CartItem[]): Promise<Cart> {
    const cart = await this.findOrCreateByUserId(userId);
    cart.items = items;
    cart.updated_at = new Date();

    await this.cartItemRepository.save(items);
    return this.cartRepository.save(cart);
  }

  // removeByUserId(userId): void {
  //   this.userCarts[ userId ] = null;
  // }

  async removeByUserId(userId: string): Promise<void> {
    const cart = await this.findByUserId(userId);
    if (cart) {
      await this.cartItemRepository.delete({ cart: { id: cart.id } });
      await this.cartRepository.delete(cart.id);
    }
  }

}
