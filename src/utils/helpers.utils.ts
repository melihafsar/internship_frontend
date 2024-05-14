import { ServiceResponse } from "@/types";
import { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const showAccordionInProfile = (
  isOpen: boolean,
  formRef: React.RefObject<HTMLDivElement>,
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setState(!isOpen);
  if (isOpen) return;
  setTimeout(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

export function showErrors(
  form: UseFormReturn<any>,
  errorResponse?: AxiosError<ServiceResponse<any>>
) {
  const errors = errorResponse?.response?.data?.error?.errors;
  if (errors) {
    Object.entries(errors).forEach(([key, value]) => {
      form.setError(key, { type: "server", message: value });
    });
  }
}

export function getError(errorResponse?: AxiosError<ServiceResponse<any>>) {
  const error = errorResponse?.response?.data?.error;
  return error;
}

export const getUserType = (session: any) => {
  if (!session?.access_token) return;
  const decoded = decodeJWT(session.access_token) as any;
  return decoded?.app_metadata?.user_type;
};

function decodeJWT(token: string) {
  try {
    return jwtDecode(token);
  } catch (error) {
    return error;
  }
}
