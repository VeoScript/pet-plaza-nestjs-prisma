import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import DeleteModal from '../components/DeleteModal'
import { useGetPets } from '../helpers/react-query/query'

const Home = () => {

  const [petID, setPetID] = React.useState<string>('')
  const [petName, setPetName] = React.useState<string>('')
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState<boolean>(false)

  const { data: pets, isLoading } = useGetPets()

  return (
    <>
      <Head>
        <title>Pets Plaza (Records)</title>
      </Head>
      <div className="flex flex-col items-center justify-start w-full h-full my-10 space-y-5">
        <div className="flex flex-row items-center justify-between w-full max-w-xl">
          <h1 className="font-bold text-xl uppercase">Pet Plaza</h1>
          <Link href="/register" className="px-3 py-1 outline-none rounded-full text-center text-xs text-white border-2 border-blue-500 bg-blue-400 hover:bg-opacity-50">
            Register
          </Link>
        </div>
        <div className="flex-col items-center w-full max-w-xl space-y-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className="font-bold text-sm">Loading...</h3>
            </div>
          )}
          {!isLoading && (
            <table className="w-full border-collapse border border-slate-500">
              <thead>
                <tr>
                  <th className="border border-neutral-400 p-3">Pet</th>
                  <th className="border border-neutral-400 p-3">Owner</th>
                  <th className="border border-neutral-400 p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet: { id: string, name: string, owner: any }) => (
                  <tr key={pet.id}>
                    <td className="border border-neutral-400 p-3">{ pet.name }</td>
                    <td className="border border-neutral-400 p-3">{ pet.owner[0]?.name }</td>
                    <td className="border border-neutral-400 p-3">
                      <div className="flex flex-row items-center justify-center w-full space-x-2">
                        <Link href={`/record/${pet.id}`} title="View" className="p-1 outline-none rounded-full border-2 border-green-600 bg-green-500 hover:bg-opacity-50">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </Link>
                        <Link href={`/record/edit/${pet.id}`} title="Update" className="p-1 outline-none rounded-full border-2 border-yellow-600 bg-yellow-500 hover:bg-opacity-50">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </Link>
                        <button
                          title="Delete"
                          className="p-1 outline-none rounded-full border-2 border-red-600 bg-red-500 hover:bg-opacity-50"
                          onClick={() => {
                            setPetID(pet.id)
                            setPetName(pet.name)
                            setIsOpenDeleteModal(true)
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <DeleteModal
        id={petID}
        name={petName}
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
      />
    </>
  )
}

export default Home