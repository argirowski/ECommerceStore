using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace API.Entities.OrderAggregate
{
    // This class is marked as [Owned] to indicate that it is an owned entity type in EF Core.
    // And owned entity types are typically used to represent value objects that do not have their own identity and lifecycle,
    // but are part of another entity (in this case, the Order entity).
    // Owned entities are stored in the same table as the owner entity, which is why they do not have a separate primary key.
    [Owned]
    public class ShippingAddress
    {
        public required string Name { get; set; }
        public required string LineOne { get; set; }
        public string? LineTwo { get; set; }
        public required string City { get; set; }
        public required string State { get; set; }
        [JsonPropertyName("postal_code")]
        public required string PostalCode { get; set; }
        public required string Country { get; set; }
    }
}
