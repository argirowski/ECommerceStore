using API.Entities.OrderAggregate;

namespace API.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public required string BuyerEmail { get; set; }
        public required ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItemDTO> OrderItems { get; set; } = new List<OrderItemDTO>();
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public long Discount { get; set; }
        public long Total { get; set; }
        public required string OrderStatus { get; set; }
        public required PaymentSummary? PaymentSummary { get; set; }
    }
}
