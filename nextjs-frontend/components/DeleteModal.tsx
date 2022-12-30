import React from 'react'
import Router from 'next/router'
import { Dialog } from '@headlessui/react'
import { useDeletePet } from '../helpers/react-query/mutation'

interface DeleteModalPropsTypes {
  id: string
  name: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const DeleteModal: React.FC<DeleteModalPropsTypes> = ({ id, name, isOpen, setIsOpen }) => {

  const deletePet = useDeletePet()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        if (!isLoading) {
          setIsOpen(false)
        }
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Dialog.Panel className="w-full max-w-sm p-5 space-y-3 rounded-xl bg-white">
          <Dialog.Title className="font-bold text-sm text-neutral-800">Delete</Dialog.Title>

          <p className="text-sm text-neutral-600">
            Are you sure you want to delete this pet named {name}?
          </p>

          <div className="flex flex-row items-center justify-end w-full space-x-2">
            <button
              disabled={isLoading}
              className={`px-3 py-1 rounded-md text-xs text-white border border-red-600 bg-red-500 hover:bg-opacity-50 ${isLoading ? 'bg-opacity-50' : 'bg-opacity-100'}`}
              onClick={async () => {
                await deletePet.mutateAsync({ id }, {
                  onError: () => {
                    setIsLoading(false)
                  },
                  onSuccess: () => {
                    setIsLoading(false)
                    setIsOpen(false)
                  }
                })
              }}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
            <button
              disabled={isLoading}
              className={`px-3 py-1 rounded-md text-xs text-white border border-neutral-600 bg-neutral-400 hover:bg-opacity-50 ${isLoading ? 'bg-opacity-50' : 'bg-opacity-100'}`}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default DeleteModal