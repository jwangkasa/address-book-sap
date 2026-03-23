'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/validations/contact'
import { Contact } from '@/types/database'
import { createClient } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Combobox } from '@/components/ui/combobox'
import { COUNTRIES } from '@/lib/constants/countries'
import { Loader2 } from 'lucide-react'

interface AddContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContactAdded: (contact: Contact) => void
  userId: string
  contact?: Contact | null
}

export default function AddContactDialog({
  open,
  onOpenChange,
  onContactAdded,
  userId,
  contact,
}: AddContactDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()
  const isEditing = !!contact

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact
      ? {
          first_name: contact.first_name || '',
          last_name: contact.last_name || '',
          email_address: contact.email_address || '',
          phone_number: contact.phone_number || '',
          mobile_number: contact.mobile_number || '',
          company_name: contact.company_name || '',
          job_title: contact.job_title || '',
          occupation: contact.occupation || '',
          country: contact.country || '',
        }
      : {
          first_name: '',
          last_name: '',
          email_address: '',
          phone_number: '',
          mobile_number: '',
          company_name: '',
          job_title: '',
          occupation: '',
          country: '',
        },
  })

  const countryValue = watch('country') || ''

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)

    try {
      if (isEditing && contact) {
        // Update existing contact
        const { data: updatedContact, error } = await supabase
          .from('contacts')
          .update({
            first_name: data.first_name,
            last_name: data.last_name,
            email_address: data.email_address || null,
            phone_number: data.phone_number || null,
            mobile_number: data.mobile_number || null,
            company_name: data.company_name || null,
            job_title: data.job_title || null,
            occupation: data.occupation || null,
            country: data.country || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', contact.id)
          .select()
          .single()

        if (error) throw error

        onContactAdded(updatedContact)
        reset()
      } else {
        // Create new contact
        const { data: newContact, error } = await supabase
          .from('contacts')
          .insert({
            user_id: userId,
            first_name: data.first_name,
            last_name: data.last_name,
            email_address: data.email_address || null,
            phone_number: data.phone_number || null,
            mobile_number: data.mobile_number || null,
            company_name: data.company_name || null,
            job_title: data.job_title || null,
            occupation: data.occupation || null,
            country: data.country || null,
          })
          .select()
          .single()

        if (error) throw error

        onContactAdded(newContact)
        reset()
      }
    } catch (error: any) {
      alert(`Failed to ${isEditing ? 'update' : 'create'} contact: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the contact information below.'
              : 'Fill in the information below to add a new contact.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="first_name">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="first_name"
                {...register('first_name')}
                placeholder="John"
              />
              {errors.first_name && (
                <p className="text-sm text-destructive">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="last_name">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="last_name"
                {...register('last_name')}
                placeholder="Doe"
              />
              {errors.last_name && (
                <p className="text-sm text-destructive">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email_address">Email Address</Label>
              <Input
                id="email_address"
                type="email"
                {...register('email_address')}
                placeholder="john.doe@example.com"
              />
              {errors.email_address && (
                <p className="text-sm text-destructive">
                  {errors.email_address.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                {...register('phone_number')}
                placeholder="+1 234 567 8900"
              />
              {errors.phone_number && (
                <p className="text-sm text-destructive">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Mobile Number */}
            <div className="space-y-2">
              <Label htmlFor="mobile_number">Mobile Number</Label>
              <Input
                id="mobile_number"
                {...register('mobile_number')}
                placeholder="+1 234 567 8901"
              />
              {errors.mobile_number && (
                <p className="text-sm text-destructive">
                  {errors.mobile_number.message}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                {...register('company_name')}
                placeholder="Acme Inc."
              />
              {errors.company_name && (
                <p className="text-sm text-destructive">
                  {errors.company_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="job_title">Job Title</Label>
              <Input
                id="job_title"
                {...register('job_title')}
                placeholder="Software Engineer"
              />
              {errors.job_title && (
                <p className="text-sm text-destructive">
                  {errors.job_title.message}
                </p>
              )}
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                {...register('occupation')}
                placeholder="Technology"
              />
              {errors.occupation && (
                <p className="text-sm text-destructive">
                  {errors.occupation.message}
                </p>
              )}
            </div>
          </div>

          {/* Country - Combobox */}
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Combobox
              value={countryValue}
              onValueChange={(value) => setValue('country', value)}
              options={COUNTRIES}
              placeholder="Select a country"
              searchPlaceholder="Search countries..."
              emptyMessage="No country found."
            />
            {errors.country && (
              <p className="text-sm text-destructive">{errors.country.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : isEditing ? (
                'Update Contact'
              ) : (
                'Create Contact'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}