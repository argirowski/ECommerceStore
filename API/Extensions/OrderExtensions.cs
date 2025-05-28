using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> ProjectToDTO(this IQueryable<Order> query)
        {
            return query.Select(order => new OrderDTO
            {
                Id = order.Id,
                BuyerEmail = order.BuyerEmail,
                OrderDate = order.OrderDate,
                ShippingAddress = order.ShippingAddress,
                PaymentSummary = order.PaymentSummary,
                DeliveryFee = order.DeliveryFee,
                Subtotal = order.Subtotal,
                Discount = order.Discount,
                OrderStatus = order.OrderStatus.ToString(),
                Total = order.GetTotal(),
                OrderItems = order.OrderItems.Select(item => new OrderItemDTO
                {
                    ProductId = item.ProductItemOrdered.ProductId,
                    Name = item.ProductItemOrdered.ProductName,
                    PictureUrl = item.ProductItemOrdered.PictureUrl,
                    Price = item.Price,
                    Quantity = item.Quantity
                }).ToList()
                // AsNoTracking is used to improve performance by not tracking the entities in the context
            }).AsNoTracking();
        }

        public static OrderDTO ToDTO(this Order order)
        {
            return new OrderDTO
            {
                Id = order.Id,
                BuyerEmail = order.BuyerEmail,
                OrderDate = order.OrderDate,
                ShippingAddress = order.ShippingAddress,
                PaymentSummary = order.PaymentSummary,
                DeliveryFee = order.DeliveryFee,
                Subtotal = order.Subtotal,
                Discount = order.Discount,
                OrderStatus = order.OrderStatus.ToString(),
                Total = order.GetTotal(),
                OrderItems = order.OrderItems.Select(item => new OrderItemDTO
                {
                    ProductId = item.ProductItemOrdered.ProductId,
                    Name = item.ProductItemOrdered.ProductName,
                    PictureUrl = item.ProductItemOrdered.PictureUrl,
                    Price = item.Price,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}
