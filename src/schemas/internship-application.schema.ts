import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  id: z.number().optional(),
  internship_posting_id: z.number(),
  message: z.string().optional(),
  cv: z.object({
    cv_url: z.string().optional(),
    file_name: z.string().optional(),
  }).optional()
});



export type InternshipApplicationFormTypes = z.infer<typeof formSchema>;

export const useInternshipApplicationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  });
  return { form };
};

