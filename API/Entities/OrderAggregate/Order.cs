using API.Enums;

namespace API.Entities.OrderAggregate
{
    public class Order
    {
        public int Id { get; set; }
        public required string BuyerEmail { get; set; }
        public required ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public long Discount { get; set; }
        public required string PaymentIntentId { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public required PaymentSummary? PaymentSummary { get; set; }

        //GetTotal method calculates the total amount for the order
        public long GetTotal()
        {
            return Subtotal + DeliveryFee - Discount;
        }
    }
}
