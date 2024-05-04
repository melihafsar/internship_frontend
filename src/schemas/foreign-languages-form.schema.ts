import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  language_code: z.string().min(1, "Bu alan zorunludur."),
  degree: z.string().min(1, "Bu alan zorunludur."),
});

export type ForeignLanguagesFormTypes = z.infer<typeof formSchema>;

export const useForeignLanguagesForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language_code: "",
      degree: "",
    },
  });
  return { form };
};
