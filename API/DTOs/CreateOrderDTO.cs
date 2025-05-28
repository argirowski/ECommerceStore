﻿using API.Entities.OrderAggregate;

namespace API.DTOs
{
    public class CreateOrderDTO
    {
        public required ShippingAddress ShippingAddress { get; set; }
        public required PaymentSummary PaymentSummary { get; set; }
    }
}
