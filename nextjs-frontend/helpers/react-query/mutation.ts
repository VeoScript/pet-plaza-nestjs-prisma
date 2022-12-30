import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../Axios'

export const useRegisterPet = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { petName: string, ownerName: string }) =>
    api.post('/pets', {
      petName: _args.petName,
      ownerName: _args.ownerName
    }),
    {
      onError: (error: any) => {
        console.error('REGISTER PET ERROR', error)
      },
      onSuccess: (data) => {
        console.log('registered data', data)
        queryClient.invalidateQueries(['pets'])
        queryClient.invalidateQueries(['pet'])
      }
    }
  )
}

export const useUpdatePet = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { id: string, petName: string, ownerName: string }) =>
    api.patch(`/pets/${_args.id}`, {
      petName: _args.petName,
      ownerName: _args.ownerName
    }),
    {
      onError: (error: any) => {
        console.error('UPDATE PET ERROR', error)
      },
      onSuccess: (data) => {
        console.log('updated data', data)
        queryClient.invalidateQueries(['pets'])
        queryClient.invalidateQueries(['pet'])
      }
    }
  )
}
