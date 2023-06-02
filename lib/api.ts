import { SignUpFormValuesType } from "@/app/signup/page";
import fetcher from "./fetcher";
import {
  BlogDefaultValuesType,
  BlogFormValuesType,
} from "@/components/BlogForm";

export const signUp = async (singUpData: SignUpFormValuesType) => {
  return await fetcher({
    url: "/api/signup",
    method: "POST",
    body: singUpData,
  });
};

export const publishBlog = async (blogData: BlogFormValuesType) => {
  return await fetcher({
    url: "/api/publish-blog",
    method: "POST",
    body: blogData,
  });
};

export const updateBlog = async (blogData: BlogDefaultValuesType) => {
  return await fetcher({
    url: "/api/update-blog",
    method: "PUT",
    body: blogData,
  });
};
