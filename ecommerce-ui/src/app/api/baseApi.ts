import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { uiSlice } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const customBaseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: "include",
});

type ErrorResponse =
  | string
  | {
      title: string;
    }
  | { errors: string[] };

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  // Start loading
  api.dispatch(uiSlice.actions.startLoading());
  await sleep();
  const result = await customBaseQuery(args, api, extraOptions);
  // Stop loading
  api.dispatch(uiSlice.actions.stopLoading());
  if (result.error) {
    const originalStatus =
      result.error.status === "PARSING_ERROR" && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status;
    const responseData = result.error.data as ErrorResponse;
    // Handle error
    switch (originalStatus) {
      case 400:
        if (typeof responseData === "string") {
          toast.error(responseData as string);
        } else if ("errors" in responseData) {
          throw Object.values(responseData.errors).flat().join(", ");
        } else {
          toast.error(responseData.title);
        }
        break;
      case 401:
        if (typeof responseData === "object" && "title" in responseData) {
          toast.error(responseData.title);
        }
        break;
      case 403:
        if (typeof responseData === "object") toast.error("403 Forbidden");
        break;
      case 404:
        if (typeof responseData === "object" && "title" in responseData) {
          router.navigate("/not-found");
        }
        break;
      case 500:
        if (typeof responseData === "object") {
          router.navigate("/server-error", { state: { error: responseData } });
        }
        break;
      default:
        break;
    }
  }
  return result;
};
