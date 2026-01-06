import { submitContactQuery } from "@/services/support.service";
import { useMutation } from "@tanstack/react-query";

export const useSubmitContactQuery = () => {
  const response = useMutation({
    mutationKey: ["useSubmitContactQuery"],
    mutationFn: async (body: {
        name: string;
        email: string;
        phoneNumber: string;
        query: string;
        }) => {
        // Assuming there's a submitContactQuery service function
        const res = await submitContactQuery(body);
        return res;
    },
    });
    return response;
};
