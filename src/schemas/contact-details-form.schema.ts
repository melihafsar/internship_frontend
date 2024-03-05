import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(3, "İsminiz en az 3 karakter olmalıdır."),
  surname: z.string().min(2, "Soyisminiz en az 2 karakter olmalıdır."),
  age: z.number().optional(),
  universityName: z.string().optional(),
});

export type ContactDetailsFormTypes = z.infer<typeof formSchema>;

export const useContactDetailsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      age: 0,
      universityName: "",
    },
  });
  return { form };
};
