import { apiRequest } from "@/helpers/apiRequest";
import { API } from "@/lib/api/apiUrl";


export const submitContactQuery = (body: any) => {
  return apiRequest({
    method: "post",
    url: API.signin,
    data: body,
    successMessage: "Login successfully.",
  });
};