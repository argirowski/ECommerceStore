namespace API.Entities.OrderAggregate
{
    public class OrderItem
    {
        public int Id { get; set; }
        // Navigation property to the product
        public required ProductItemOrdered ProductItemOrdered { get; set; } = null!;
        public long Price { get; set; }
        public int Quantity { get; set; }

    }
}
