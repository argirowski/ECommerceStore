using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate
{
    [Owned]
    public class PaymentSummary
    {
        public int LastFor { get; set; }
        public required string Brand { get; set; }
        public int ExpMonth { get; set; }
        public int ExpYear { get; set; }
    }
}