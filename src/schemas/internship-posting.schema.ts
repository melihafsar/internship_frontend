import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(1, "Bu alan zorunludur.")
    .max(255, "Bu alan en fazla 255 karakter olabilir."),
  image_url: z.string().optional(),
  description: z
    .string()
    .min(1, "Bu alan zorunludur.")
    .max(2000, "Bu alan en fazla 2000 karakter olabilir."),
  sector: z
    .string()
    .max(255, "Bu alan en fazla 255 karakter olabilir.")
    .optional(),
  country_id: z.coerce.number().optional(),
  city_id: z.coerce.number().optional(),
  location: z.string().optional(),
  requirements: z.string().optional(),
  work_type: z.enum(["Office", "Remote", "Hybrid"]),
  employment_type: z.enum(["FullTime", "PartTime"]),
  has_salary: z.boolean().optional(),
  dead_line: z.coerce.date(),
});

export type InternshipPostingFormTypes = z.infer<typeof formSchema>;

export const useInternshipPostingForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  return { form };
};
