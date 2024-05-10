import { ServiceReponse } from "@/types";
import { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";

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

export function showErrors(form: UseFormReturn<any>, errorResponse?: AxiosError<ServiceReponse<any>>) {
  const errors = errorResponse?.response?.data?.error?.errors
  if (errors) {
    Object.entries(errors).forEach(([key, value]) => {
      form.setError(key, { type: "server", message: value });
    });
  }
}; 

export function getError(errorResponse?: AxiosError<ServiceReponse<any>>) {
  const error = errorResponse?.response?.data?.error
  return error;
}; 