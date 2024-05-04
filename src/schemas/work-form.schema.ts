import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  company_name: z.string().min(2, "Şirket adı en az 2 karakter olmalıdır."),
  position: z.string().min(4, "Pozisyon adı en az 4 karakter olmalıdır."),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  is_working_now: z.boolean(),
  description: z.string().optional(),
  duties: z.string().min(15, "Görevler en az 15 karakter olmalıdır."),
  work_type: z.string().optional(),
  reason_for_leave: z.string().optional(),
});

export type WorkFormTypes = z.infer<typeof formSchema>;

export const useWorkForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      position: "",
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      is_working_now: false,
      description: "",
      duties: "",
      work_type: "Office",
      reason_for_leave: "",
    },
  });
  return { form };
};
