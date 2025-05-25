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
