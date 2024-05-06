import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  date_of_birth: z.coerce.date(),
  gender: z.string().min(1, "Lütfen cinsiyetinizi seçiniz!"),
  driver_licences: z.array(z.string()).min(1, "En az bir seçeneği seçiniz!"),
  marital_status: z.string(),
  military_status: z.string().optional(),
  country_id: z.number().optional(),
  city_id: z.number().optional(),
  district: z.string().optional(),
  address: z.string().optional(),
});

export type PrivateInformationFormTypes = z.infer<typeof formSchema>;

export const usePrivateInformationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date_of_birth: new Date(),
      gender: "",
      driver_licences: [],
      marital_status: "",
      military_status: "",
      country_id: 0,
      city_id: 0,
      district: "",
      address: "",
    },
  });
  return { form };
};
