using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaymentController(PaymentsService paymentsService, StoreContext context) : BaseApiController
    {
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDTO>> CreateOrUpdatePaymentIntent()
        {
            var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

            if (basket == null) return BadRequest("Basket not found");

            var intent = await paymentsService.CreateOrUpdatePaymentIntent(basket, 10000);

            if (intent == null) return BadRequest("Problem with payment");

            basket.PaymentIntentId ??= intent.Id;

            basket.ClientSecret ??= intent.ClientSecret;

            var result = await context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Problem saving payment intent");

            return basket.ToDTO();

        }
    }
}