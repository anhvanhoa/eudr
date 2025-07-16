import { FormRegister } from "@/components/register";
import { http } from "@/lib/http";

const authApi = {
    register(data: FormRegister) {
        return http.post("/auth/register", {
            ...data,
            // role_id: data.step2?.userRole,
            // type: data.step1?.accountType,
            // 'gender' => 'nullable|in:male,female',
            // 'age' => 'nullable|integer',
            // 'address' => 'nullable|string|max:255',
            // 'email' => 'nullable|email|max:255|unique:users,email',
            // 'citizen_id' => 'nullable|string|max:255|unique:users,citizen_id',
            // 'citizen_date_issue' => 'nullable|date_format:Y-m-d',
            // 'citizen_place_issue' => 'nullable|string|max:255',
            // 'path_citizen_front' => 'nullable|mimes:png,jpg,jpeg',
            // 'path_citizen_back' => 'nullable|mimes:png,jpg,jpeg',
            // 'phone' => 'required|string|max:255|unique:users,phone',
            // 'password' => 'required|confirmed|max:255',
            // 'representative' => 'nullable|string|max:255',
            // 'tax' => 'nullable|string|max:255',
            // 'registration_license' => 'nullable|mimes:png,jpg,jpeg,pdf',
            // 'business_registration_number' => 'nullable|unique:users,business_registration_number',
            // 'path' => 'nullable|mimes:png,jpg,jpeg',
        });
    },
};

export default authApi;
