import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  project_name: z.string().min(10, "Proje adı en az 10 karakter olmalıdır."),
  description: z
    .string()
    .min(50, "Proje açıklaması en az 50 karakter olmalıdır.")
    .max(1000, "Proje açıklaması en fazla 500 karakter olmalıdır."),
  project_link: z
    .string()
    .url("Proje linki geçerli bir URL olmalıdır.")
    .optional(),
});

export type ProjectFormTypes = z.infer<typeof formSchema>;

export const useProjectForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project_name: "",
      description: "",
      project_link: "",
    },
  });
  return { form };
};
