import {z} from 'zod'

export const LoginSchema = z.object({
   email: z.string().min(1, "Your university email address is required")
          .email()
          .refine(value => value.endsWith("@cit.mak.ac.ug"), {
            message: "Please enter a valid university email address"
          }),
  password: z.string().min(1, "Your password is required"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;


export const RegistrationSchema = z.object({
  firstName: z.string().min(1, "Your first name is required"),
  lastName: z.string().min(1, "Your last name is required"),
  role: z.string().optional().default("Lecturer"),
  department: z.string().min(1, "Your registration number is required"),
  email: z.string().min(1, "Your university email address is required")
          .email()
          .refine(value => value.endsWith("@cit.mak.ac.ug") || value.endsWith("@mak.ac.ug"), {
            message: "Please enter a valid university email address"
          }),   
  password: z.string().min(8, "Your password is required").min(8, "Your password cannot be less than 8 characters"),
  confirmPassword: z.string(),

}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;
