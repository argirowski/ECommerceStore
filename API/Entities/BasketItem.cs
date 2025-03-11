using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        //Navigation property to the product
        public int ProductId { get; set; }
        //Navigation property to the product
        public required Product Product { get; set; }
        //Navigation property to the basket
        public int BasketId { get; set; }
        //Navigation property to the basket
        public Basket Basket { get; set; } = null!;
    }
}