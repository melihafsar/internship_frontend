import { CommentRatings } from "@/components/CommentRatings";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CommentPostingFormTypes } from "@/schemas/comment-posting-form.schema";
import { UseFormReturn } from "react-hook-form";

interface CommentPostingFormProps {
  form: UseFormReturn<CommentPostingFormTypes>;
  loading: boolean;
  handleFormSubmit: (data: CommentPostingFormTypes) => void;
}

function CommentPostingForm({
  form,
  loading,
  handleFormSubmit,
}: CommentPostingFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-2"
      >
        <div className="flex flex-col justify-center items-center space-y-2">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-[98%] h-[100px]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline">
                  Mesajınız
                </FormLabel>
                <FormControl>
                  <Textarea maxLength={2000} {...field} />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="points"
            render={({ field }) => (
              <FormItem className="w-[98%]">
                <FormLabel className="flex flex-row gap-x-2 items-baseline my-2">
                  Puanınız
                </FormLabel>
                <FormControl>
                  <CommentRatings
                    rating={field.value || 0}
                    onRatingChange={field.onChange}
                    totalStars={10}
                  />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          variant="default"
          className="w-full"
        >
          Gönder
        </Button>
      </form>
    </Form>
  );
}

export default CommentPostingForm;
