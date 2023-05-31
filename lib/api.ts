import { SignUpFormValuesType } from "@/app/signup/page";
import fetcher from "./fetcher";

export const signUp = async (singUpData: SignUpFormValuesType) => {
  return await fetcher({
    url: "/api/signup",
    method: "POST",
    body: singUpData,
  });
};
