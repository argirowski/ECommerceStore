import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Fragment } from "react/jsx-runtime";
import OrderSummary from "../../app/shared/components/OrderSummary";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useAppSelector } from "../../app/store/store";
import { useEffect, useMemo, useRef } from "react";
import { useFetchBasketQuery } from "../basket/basketApi";
import CheckoutStepper from "./CheckoutStepper";
import { Elements } from "@stripe/react-stripe-js";
import { useCreatePaymentIntentMutation } from "./checkoutApi";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK || "");

const CheckoutPage: React.FC = () => {
  const { data: basket } = useFetchBasketQuery();
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
  const created = useRef(false);
  const { darkMode } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (!created.current) createPaymentIntent();
    created.current = true;
  }, [createPaymentIntent]);

  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
    return {
      clientSecret: basket.clientSecret,
      appearance: {
        labels: "floating",
        theme: darkMode ? "night" : "stripe",
      },
    };
  }, [basket?.clientSecret, darkMode]);

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid size={8}>
          {!stripePromise || !options || isLoading ? (
            <Typography variant="h6">Loading checkout...</Typography>
          ) : (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutStepper />
            </Elements>
          )}
        </Grid>
        <Grid size={4}>
          <OrderSummary />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CheckoutPage;
