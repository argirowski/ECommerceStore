using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            var basketId = Request.Cookies["basketId"];
            var basket = await context.Baskets.GetBasketWithItems(basketId);

            if (basket == null)
            {
                return NoContent();
            }
            return basket.ToDTO();
        }

        [HttpPost]
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int quantity)
        {
            // First get the basket
            var basketId = Request.Cookies["basketId"];
            var basket = await context.Baskets.GetBasketWithItems(basketId);
            // If the basket does not exist, create a new basket
            basket ??= CreateBasket();
            // Get a product by id
            var product = await context.Products.FindAsync(productId);

            if (product == null)
            {
                return BadRequest("Problem Adding Item to Basket");
            }
            // Add the product to the basket
            basket.AddItem(product, quantity);
            // Save the changes
            var result = await context.SaveChangesAsync();

            if (result > 0)
            {
                return CreatedAtAction(nameof(GetBasket), basket.ToDTO());
            }
            else
            {
                return BadRequest("Problem Updating Basket");
            }
        }

        [HttpDelete]
        public async Task<ActionResult<BasketDTO>> RemoveBasketItem(int productId, int quantity)
        {
            // First get the basket
            var basketId = Request.Cookies["basketId"];
            var basket = await context.Baskets.GetBasketWithItems(basketId);

            if (basket == null)
            {
                return BadRequest("Unable to Retrieve Basket");
            }

            // Remove the item from the basket
            basket.RemoveItem(productId, quantity);

            // Save the changes
            var result = await context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok(basket);
            }
            else
            {
                return BadRequest("Problem removing item from basket");
            }
        }

        private Basket CreateBasket()
        {
            var basketId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };
            Response.Cookies.Append("basketId", basketId, cookieOptions);

            var basket = new Basket { BasketId = basketId };
            context.Baskets.Add(basket);
            return basket;
        }
    }
}
