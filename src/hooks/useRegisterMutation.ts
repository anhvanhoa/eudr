import { useMutation } from "@tanstack/react-query";
import authApi from "@/api/auth";
import { FormRegister } from "@/components/register";

export function useRegisterMutation() {
    return useMutation({
        mutationFn: (data: FormRegister) => authApi.register(data),
    });
}
