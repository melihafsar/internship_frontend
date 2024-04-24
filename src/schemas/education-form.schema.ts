import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  university_name: z
    .string()
    .min(5, "Üniversite adı en az 5 karakter olmalıdır."),
  faculty: z.string().min(8, "Fakülte adı en az 8 karakter olmalıdır."),
  department: z.string().min(5, "Bölüm adı en az 5 karakter olmalıdır."),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  is_graduated: z.boolean(),
  education_year: z.coerce.number().min(0),
  gpa: z.coerce.number().min(0),
  description: z.string().optional(),
});

export type EducationFormTypes = z.infer<typeof formSchema>;

export const useEducationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      university_name: "",
      faculty: "",
      department: "",
      start_date: new Date(),
      end_date: new Date(),
      is_graduated: false,
      education_year: 0,
      gpa: 0,
      description: "",
    },
  });
  return { form };
};
