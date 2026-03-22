'use client'

import { useState } from 'react'
import ContactModal from './ContactModal'

export default function AddContactButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="font-medium">Add Contact</span>
      </button>

      {isOpen && (
        <ContactModal
          contact={null}
          userId=""
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}