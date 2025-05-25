using API.Entities;
using Stripe;

namespace API.Services
{
    public class PaymentsService(IConfiguration configuration)
    {
        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket, int amount)
        {
            StripeConfiguration.ApiKey = configuration["StripeSettings:SecretKey"];
            var service = new PaymentIntentService();

            var intent = new PaymentIntent();

            var subTotal = basket.Items.Sum(x => x.Quantity * x.Product.Price);

            var deliveryFee = subTotal > 10000 ? 0 : 500;

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subTotal + deliveryFee,
                    Currency = "usd",
                    PaymentMethodTypes = ["card"]
                };
                intent = await service.CreateAsync(options);
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subTotal + deliveryFee
                };
                intent = await service.UpdateAsync(basket.PaymentIntentId, options);
            }
            return intent;
        }
    }
}