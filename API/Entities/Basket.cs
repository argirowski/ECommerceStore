using System.Xml.Serialization;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public required string BasketId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantity)
        {
            if (product == null)
            {
                ArgumentNullException.ThrowIfNull(product);
            }
            if (quantity <= 0)
            {
                throw new ArgumentException("Quantity must be greater than 0", nameof(quantity));
            }

            var existingItem = FindItem(product.Id);
            if (existingItem == null)
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }
            else
            {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int id, int quantity)
        {
            if (quantity <= 0)
            {
                throw new ArgumentException("Quantity must be greater than 0", nameof(quantity));
            }
            var existingItem = FindItem(id);
            if (existingItem == null)
            {
                return;
            }
            existingItem.Quantity -= quantity;
            if (existingItem.Quantity <= 0)
            {
                Items.Remove(existingItem);
            }
        }

        private BasketItem? FindItem(int id)
        {
            return Items.FirstOrDefault(x => x.ProductId == id);
        }
    }
}
