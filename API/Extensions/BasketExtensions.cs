using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDTO ToDTO(this Basket basket)
        {
            return new BasketDTO
            {
                BasketId = basket.BasketId,
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
    }
}
