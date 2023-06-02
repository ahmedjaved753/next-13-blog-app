"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { blogFormSchema } from "@/lib/validationSchemas";
import { publishBlog, updateBlog } from "@/lib/api";
import { useToast } from "./ui/use-toast";

export type BlogFormValuesType = z.infer<typeof blogFormSchema>;

export type BlogDefaultValuesType = {
  id: string;
} & BlogFormValuesType;

type BlogFormPropsType = {
  defaultValues?: BlogDefaultValuesType;
};

function BlogForm({ defaultValues }: BlogFormPropsType) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogFormValuesType>({
    resolver: zodResolver(blogFormSchema),
    ...(defaultValues && { defaultValues }),
  });

  const publish = defaultValues ? false : true;

  const onSubmit: SubmitHandler<BlogFormValuesType> = async (data) => {
    try {
      await (publish
        ? publishBlog(data)
        : updateBlog({ ...data, id: defaultValues?.id as string }));
      toast({
        description: publish
          ? "Blog Published Successfully"
          : "Blog Updated Successfully",
      });
      !defaultValues && reset();
    } catch (e: any) {
      console.error(e);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center place-content-center w-screen h-screen">
      <div className="w-5/6 md:w-4/6 lg:w-3/6">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-2">
          Publish Blog
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Email</Label>
          <Input id="title" placeholder="Title" {...register("title")} />
          <Label htmlFor="content">Description</Label>
          <Textarea
            id="content"
            placeholder="Type your message here."
            rows={20}
            {...register("content")}
          />
          <Button className="mt-2 w-full" type="submit">
            Publish Blog
          </Button>
        </form>
      </div>
    </div>
  );
}

export default BlogForm;
