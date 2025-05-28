using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDTO ToDTO(this Basket basket)
        {
            return new BasketDTO
            {
                BasketId = basket.BasketId,
                ClientSecret = basket.ClientSecret,
                PaymentIntentId = basket.PaymentIntentId,
                Items = basket.Items.Select(x =>
                new BasketItemDTO
                {
                    ProductId = x.Product.Id,
                    Name = x.Product.Name,
                    Brand = x.Product.Brand,
                    Price = x.Product.Price,
                    Type = x.Product.Type,
                    PictureUrl = x.Product.PictureUrl,
                    Quantity = x.Quantity
                }).ToList()
            };
        }

        public static async Task<Basket> GetBasketWithItems(this IQueryable<Basket> query, string? basketId)
        {
            return await query.Include(x => x.Items).ThenInclude(x => x.Product).FirstOrDefaultAsync(x => x.BasketId == basketId) ?? throw new Exception("Cannot get basket");
        }
    }
}
