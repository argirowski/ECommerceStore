import { createApi } from "@reduxjs/toolkit/query/react";
import { Basket, BasketItem } from "../../app/models/basket";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Product } from "../../app/models/product";

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => "basket",
      providesTags: ["Basket"],
    }),
    addBasketItem: builder.mutation<
      Basket,
      { product: Product; quantity: number }
    >({
      query: ({ product, quantity }) => ({
        url: `basket?productId=${product.id}&quantity=${quantity}`,
        method: "POST",
      }),
      onQueryStarted: async (
        { product, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            if (draft) {
              const existingItem = draft.items.find(
                (x) => x.productId === product.id
              );
              if (existingItem) {
                existingItem.quantity += quantity;
              } else {
                draft.items.push(new BasketItem(product, quantity));
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    removeBasketItem: builder.mutation<
      void,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        var patchResults = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            if (draft) {
              const itemIndex = draft.items.findIndex(
                (x) => x.productId === productId
              );
              if (itemIndex >= 0) {
                draft.items[itemIndex].quantity -= quantity;
                if (draft.items[itemIndex].quantity <= 0) {
                  draft.items.splice(itemIndex, 1);
                }
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResults.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchBasketQuery,
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} = basketApi;
