import { BasketItem } from "../../../app/models/basket";
import {
  useFetchBasketQuery,
  useClearBasketMutation,
} from "../../basket/basketApi";

export const useBasket = () => {
  const { data: basket } = useFetchBasketQuery();
  const [clearBasket] = useClearBasketMutation();

  const subtotal =
    basket?.items.reduce(
      (sum: number, item: BasketItem) => sum + item.quantity * item.price,
      0
    ) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  let discount = 0;

  if (basket?.coupon) {
    if (basket.coupon.amountOff) {
      discount = basket.coupon.amountOff;
    } else if (basket.coupon.percentOff) {
      discount =
        Math.round(subtotal * (basket.coupon.percentOff / 100) * 100) / 100;
    }
  }

  const total = Math.round((subtotal - discount + deliveryFee) * 100) / 100;

  return { basket, subtotal, deliveryFee, discount, total, clearBasket };
};
