'use client'

import { useState } from 'react'
import { Contact } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import AddContactDialog from './AddContactDialog'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface DashboardClientProps {
  initialContacts: Contact[]
  userId: string
}

export default function DashboardClient({
  initialContacts,
  userId,
}: DashboardClientProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase()
    return (
      contact.first_name?.toLowerCase().includes(query) ||
      contact.last_name?.toLowerCase().includes(query) ||
      contact.email_address?.toLowerCase().includes(query) ||
      contact.company_name?.toLowerCase().includes(query) ||
      contact.phone_number?.toLowerCase().includes(query) ||
      contact.mobile_number?.toLowerCase().includes(query)
    )
  })

  const handleContactAdded = (newContact: Contact) => {
    setContacts([...contacts, newContact])
    setIsAddDialogOpen(false)
    router.refresh()
  }

  const handleContactUpdated = (updatedContact: Contact) => {
    setContacts(
      contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    )
    setEditingContact(null)
    router.refresh()
  }

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
  }

  const handleDelete = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) {
      return
    }

    const { error } = await supabase.from('contacts').delete().eq('id', contactId)

    if (error) {
      alert('Failed to delete contact: ' + error.message)
      return
    }

    setContacts(contacts.filter((c) => c.id !== contactId))
    router.refresh()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Address Book</h1>
          <p className="text-muted-foreground mt-1">
            Manage your contacts efficiently
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search contacts by name, email, company, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? 'No contacts found matching your search.'
                        : 'No contacts yet. Click "Add Contact" to get started.'}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">
                    {contact.first_name} {contact.last_name}
                  </TableCell>
                  <TableCell>{contact.email_address || '-'}</TableCell>
                  <TableCell>{contact.phone_number || '-'}</TableCell>
                  <TableCell>{contact.mobile_number || '-'}</TableCell>
                  <TableCell>{contact.company_name || '-'}</TableCell>
                  <TableCell>{contact.job_title || '-'}</TableCell>
                  <TableCell>{contact.country || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(contact)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Showing {filteredContacts.length} of {contacts.length} contacts
      </div>

      {/* Add Contact Dialog */}
      <AddContactDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onContactAdded={handleContactAdded}
        userId={userId}
      />

      {/* Edit Contact Dialog */}
      {editingContact && (
        <AddContactDialog
          open={!!editingContact}
          onOpenChange={(open) => !open && setEditingContact(null)}
          onContactAdded={handleContactUpdated}
          userId={userId}
          contact={editingContact}
        />
      )}
    </div>
  )
}