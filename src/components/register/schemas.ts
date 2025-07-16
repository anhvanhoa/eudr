import * as z from "zod";

export const step1Schema = z
    .object({
        accountType: z.enum(["individual", "business"]),
        phoneNumber: z.string().optional(),
        businessRegistrationNumber: z.string().optional(),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })
    .refine(
        data => {
            if (data.accountType === "individual") {
                return data.phoneNumber && data.phoneNumber.length > 0;
            }
            if (data.accountType === "business") {
                return (
                    data.businessRegistrationNumber && data.businessRegistrationNumber.length > 0
                );
            }
            return true;
        },
        {
            message: "Required field for selected account type",
            path: ["phoneNumber"],
        }
    );

export const step2Schema = z.object({
    userRole: z.string().min(1, "Please select a role"),
});

export const step3IndividualSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    gender: z.enum(["male", "female", "other"]),
    age: z.number().min(18, "Must be at least 18 years old"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email().optional().or(z.literal("")),
    nationalIdNumber: z.string().min(1, "National ID is required"),
    idIssueDate: z.string().min(1, "ID issue date is required"),
    idIssuePlace: z.string().min(1, "ID issue place is required"),
});

export const step3BusinessSchema = z.object({
    organizationName: z.string().min(1, "Organization name is required"),
    legalRepresentativeName: z.string().min(1, "Legal representative name is required"),
    taxCode: z.string().min(1, "Tax code is required"),
    organizationAddress: z.string().min(1, "Organization address is required"),
    organizationPhone: z.string().min(1, "Organization phone is required"),
    email: z.string().email().optional().or(z.literal("")),
});

export const step4Schema = z.object({
    agreeToTerms: z.boolean().refine(val => val === true, {
        message: "You must agree to the terms and conditions",
    }),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3IndividualData = z.infer<typeof step3IndividualSchema>;
export type Step3BusinessData = z.infer<typeof step3BusinessSchema>;
export type Step4Data = z.infer<typeof step4Schema>;

export type FormRegister = {
    step1?: Step1Data;
    step2?: Step2Data;
    step3?: Step3IndividualData | Step3BusinessData;
    step4?: Step4Data;
};
