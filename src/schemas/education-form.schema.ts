import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  university_available: z.boolean(),
  university_id: z.coerce.number().optional(),
  university_name: z
    .string()
    .min(3, "Üniversite adı en az 3 karakter olmalıdır.")
    .optional(),
  faculty: z.string().min(3, "Fakülte adı en az 3 karakter olmalıdır."),
  department: z.string().min(3, "Bölüm adı en az 3 karakter olmalıdır."),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  is_graduated: z.boolean(),
  education_year: z.coerce.number().min(0).nullable(),
  gpa: z.coerce.number().min(0),
  description: z.string().optional(),
});

export type EducationFormTypes = z.infer<typeof formSchema>;

export const useEducationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      university_available: true,
      university_id: 0,
      university_name: undefined,
      faculty: "",
      department: "",
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      is_graduated: false,
      education_year: 0,
      gpa: 0,
      description: "",
    },
  });
  return { form };
};
