import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  surname: z.string().min(2, "Soyisim en az 2 karakter olmalıdır."),
  company: z.string().min(2, "Şirket adı en az 2 karakter olmalıdır."),
  duty: z.string().min(4, "Görev adı en az 4 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone_number: z
    .string()
    .min(10, "Telefon numarası 10 karakter olmalıdır.")
    .max(10, "Telefon numarası 10 karakter olmalıdır."),
  description: z
    .string()
    .min(15, "Açıklama en az 15 karakter olmalıdır.")
    .max(500, "Açıklama en fazla 500 karakter olmalıdır."),
});

export type ReferencesFormTypes = z.infer<typeof formSchema>;

export const useReferencesForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      company: "",
      duty: "",
      email: "",
      phone_number: "",
      description: "",
    },
  });
  return { form };
};
