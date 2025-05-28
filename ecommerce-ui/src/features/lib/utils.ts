export const currencyFormatter = (amount: number) => {
  return "$" + (amount / 100).toFixed(2);
};

// The filteredParams object will remove any empty, null, or undefined values from the productParams object and this will lead to a cleaner URL query.
export const filterEmptyValues = (values: object) => {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([_, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined &&
        value.length !== 0
    )
  );
};

export const addressStringFormatter = (address: ShippingAddress) => {
  return `${address?.name}, ${address?.line1}, ${address?.city}, ${address?.state}, 
            ${address?.postal_code}, ${address?.country}`;
};

export const paymentStringFormatter = (card: PaymentSummary) => {
  return `${card?.brand?.toUpperCase()}, **** **** **** ${card?.last4}, 
            Exp: ${card?.exp_month}/${card?.exp_year}`;
};
