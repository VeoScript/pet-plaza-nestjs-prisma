import { useQuery } from '@tanstack/react-query'
import api from '../Axios'

export const useGetPets = () => {
  return useQuery(['pets'],
    async () => {
      const pets = await api.get(`/pets`)
      return pets.data
    }
  )
}
