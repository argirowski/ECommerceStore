
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController(StoreContext storeContext) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrdersForUser()
        {
            var orders = await storeContext.Orders.ProjectToDTO().Where(x => x.BuyerEmail == User.GetUserName()).ToListAsync();

            return orders;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrderDetailsForUser(int id)
        {
            var order = await storeContext.Orders.ProjectToDTO().Where(x => x.BuyerEmail == User.GetUserName() && id == x.Id).FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }
            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDTO createOrderDTO)
        {
            var basket = await storeContext.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

            if (basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                return BadRequest("Basket not found or empty");
            }

            var items = CreateOrderItems(basket.Items);

            var subTotal = items.Sum(item => item.Price * item.Quantity);

            var deliveryFee = CalculateDeliveryFee(subTotal);

            var order = await storeContext.Orders
                .Include(x => x.OrderItems)
                .FirstOrDefaultAsync(x => x.PaymentIntentId == basket.PaymentIntentId);

            if (order == null)
            {
                order = new Order
                {
                    OrderItems = items,
                    BuyerEmail = User.GetUserName(),
                    ShippingAddress = createOrderDTO.ShippingAddress,
                    DeliveryFee = deliveryFee,
                    Subtotal = subTotal,
                    PaymentSummary = createOrderDTO.PaymentSummary,
                    PaymentIntentId = basket.PaymentIntentId,
                };

                storeContext.Orders.Add(order);
            }
            else
            {
                order.OrderItems = items;
            }

            var result = await storeContext.SaveChangesAsync() > 0;

            if (!result)
            {
                return BadRequest("Problem creating order");
            }

            return CreatedAtAction(nameof(GetOrderDetailsForUser), new { id = order.Id }, order.ToDTO());
        }

        private long CalculateDeliveryFee(long subTotal)
        {
            return subTotal > 10000 ? 0 : 500;
        }

        private List<OrderItem> CreateOrderItems(List<BasketItem> items)
        {
            var orderItems = new List<OrderItem>();
            foreach (var item in items)
            {
                if (item.Product.QuantityInStock < item.Quantity)
                    return null;

                var orderItem = new OrderItem
                {
                    ProductItemOrdered = new ProductItemOrdered
                    {
                        ProductId = item.ProductId,
                        PictureUrl = item.Product.PictureUrl,
                        ProductName = item.Product.Name
                    },
                    Price = item.Product.Price,
                    Quantity = item.Quantity
                };
                orderItems.Add(orderItem);

                item.Product.QuantityInStock -= item.Quantity;
            }

            return orderItems;
        }
    }
}