import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ConfirmationToken,
  StripeAddressElementChangeEvent,
  StripePaymentElementChangeEvent,
} from "@stripe/stripe-js";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { currencyFormatter } from "../lib/utils";
import Review from "./Review";
import { useBasket } from "../lib/hooks/useBasket";
import {
  useFetchAddressQuery,
  useUpdateUserAddressMutation,
} from "../account/accountApi";
import { LoadingButton } from "@mui/lab";
import { useCreateOrderMutation } from "../orders/orderApi";

const steps = ["Address", "Payment", "Review"];

const CheckoutStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [createOrder] = useCreateOrderMutation();
  const { basket } = useBasket();
  const { data, isLoading } = useFetchAddressQuery();
  const [updateAddress] = useUpdateUserAddressMutation();
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const [addressComplete, setAddressComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { total, clearBasket } = useBasket();
  const navigate = useNavigate();
  const [confirmationToken, setConfirmationToken] =
    useState<ConfirmationToken | null>(null);

  let name, restAddress;
  if (data) {
    ({ name, ...restAddress } = data);
  }

  const handleNext = async () => {
    if (activeStep === 0 && saveAddressChecked && elements) {
      const address = await getStripeAddress();
      if (address) await updateAddress(address);
    }
    if (activeStep === 1) {
      if (!elements || !stripe) return;
      const result = await elements.submit();
      if (result.error) return toast.error(result.error.message);

      const stripeResult = await stripe.createConfirmationToken({ elements });
      if (stripeResult.error) return toast.error(stripeResult.error.message);
      setConfirmationToken(stripeResult.confirmationToken);
    }
    if (activeStep === 2) {
      await confirmPayment();
    }
    if (activeStep < 2) setActiveStep((step) => step + 1);
  };

  const confirmPayment = async () => {
    setSubmitting(true);
    try {
      if (!confirmationToken || !basket?.clientSecret)
        throw new Error("Unable to process payment");

      const orderModel = await createOrderModel();
      const orderResult = await createOrder(orderModel);

      const paymentResult = await stripe?.confirmPayment({
        clientSecret: basket.clientSecret,
        redirect: "if_required",
        confirmParams: {
          confirmation_token: confirmationToken.id,
        },
      });

      if (paymentResult?.paymentIntent?.status === "succeeded") {
        navigate("/checkout/success", { state: orderResult });
        clearBasket();
      } else if (paymentResult?.error) {
        throw new Error(paymentResult.error.message);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setActiveStep((step) => step - 1);
    } finally {
      setSubmitting(false);
    }
  };

  const createOrderModel = async () => {
    const shippingAddress = await getStripeAddress();
    const paymentSummary = confirmationToken?.payment_method_preview.card;

    if (!shippingAddress || !paymentSummary)
      throw new Error("Problem creating order");

    return { shippingAddress, paymentSummary };
  };

  const getStripeAddress = async () => {
    const addressElement = elements?.getElement("address");
    if (!addressElement) return null;
    const {
      value: { name, address },
    } = await addressElement.getValue();

    if (name && address) return { ...address, name };

    return null;
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    setAddressComplete(event.complete);
  };

  const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    setPaymentComplete(event.complete);
  };

  if (isLoading)
    return <Typography variant="h6">Loading checkout...</Typography>;
  return (
    <Fragment>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
            <AddressElement
              options={{
                mode: "shipping",
                defaultValues: {
                  name: name,
                  address: restAddress,
                },
              }}
              onChange={handleAddressChange}
            />
            <FormControlLabel
              sx={{ display: "flex", justifyContent: "end" }}
              control={
                <Checkbox
                  checked={saveAddressChecked}
                  onChange={(e) => setSaveAddressChecked(e.target.checked)}
                />
              }
              label="Save as default address"
            />
          </Box>
          <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
            <PaymentElement
              onChange={handlePaymentChange}
              options={{
                wallets: {
                  applePay: "never",
                  googlePay: "never",
                },
              }}
            />
          </Box>
          <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
            <Review confirmationToken={confirmationToken} />
          </Box>
        </Box>

        <Box display="flex" paddingTop={2} justifyContent="space-between">
          <Button onClick={handleBack}>Back</Button>
          <LoadingButton
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !addressComplete) ||
              (activeStep === 1 && !paymentComplete) ||
              submitting
            }
            loading={submitting}
          >
            {activeStep === steps.length - 1
              ? `Pay ${currencyFormatter(total)}`
              : "Next"}
          </LoadingButton>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default CheckoutStepper;
