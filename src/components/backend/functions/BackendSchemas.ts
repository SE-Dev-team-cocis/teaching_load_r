import {z} from 'zod'

export const CollegeSchema = z.object({
    collegeName: z.string().min(1, "The college name is required"),
    collegeCode: z.string().min(1, "The college code is required"),
 });
 export type CollegeType = z.infer<typeof CollegeSchema>;

 export const CourseSchema = z.object({
    course_name: z.string().min(5, "Enter a valid course name"),
    course_code: z.string().min(3, "Enter a valid course code"),
    course_cus: z.coerce.number().min(3, "Enter valid credit units"),
    semester: z.number().default(1),
    departmentId: z.coerce.number().min(1, "Your password is required")
 });
export type CourseType = z.infer<typeof CourseSchema>;

 