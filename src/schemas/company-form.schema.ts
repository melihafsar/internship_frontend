import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Bu alan zorunludur.").max(255, "Bu alan en fazla 255 karakter olabilir."),
  short_description: z.string().max(75, "Bu alan en fazla 75 karakter olabilir."),
  logo_url: z.string().optional(),
  website_url: z.string().optional(),
  background_photo_url: z.string().optional(),
  city_id: z.number().optional(),
  country_id: z.number().optional(),
  sector: z.string().optional(),
  number_of_workers: z.coerce.number().optional(),
  description: z.string().min(1, "Bu alan zorunludur.").max(2000, "Bu alan en fazla 2000 karakter olabilir."),
});

export type CompanyFormTypes = z.infer<typeof formSchema>;

export const useCompanyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  return { form };
};

