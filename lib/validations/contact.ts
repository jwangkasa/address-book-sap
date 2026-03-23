import { z } from "zod"

export const contactSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(100),
  last_name: z.string().min(1, "Last name is required").max(100),
  email_address: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone_number: z.string().optional().or(z.literal("")),
  mobile_number: z.string().optional().or(z.literal("")),
  company_name: z.string().max(200).optional().or(z.literal("")),
  job_title: z.string().max(100).optional().or(z.literal("")),
  occupation: z.string().max(100).optional().or(z.literal("")),
  country: z.string().max(100).optional().or(z.literal("")),
})

export type ContactFormData = z.infer<typeof contactSchema>