using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Address
    {
        [JsonIgnore]
        public int Id { get; set; }
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
