import { Cart, CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
// export function calculateCartTotal(cart: Cart): number {
//   return cart ? cart.items.reduce((acc: number, { product: { price }, count }: CartItem) => {
//     return acc += price * count;
//   }, 0) : 0;
// }


export function calculateCartTotal(cart: Cart): number {
  return cart ? cart.items.reduce((acc: number, item: CartItem) => {
    return acc += item.product.price * item.count;
  }, 0) : 0;
}
