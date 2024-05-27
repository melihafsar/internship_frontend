import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  internship_posting_id: z.number().optional(),
  comment: z.string().min(1).max(1000),
  points: z.coerce.number().min(1).max(10),
});

export type CommentPostingFormTypes = z.infer<typeof formSchema>;

export const useCommentPostingForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  return { form };
};
