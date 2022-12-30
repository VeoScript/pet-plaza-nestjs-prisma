import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGetPet } from '../../helpers/react-query/query'

const View = () => {

  const router: any = useRouter()

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const { id } = router.query

  const { data: pet, isLoading } = useGetPet(id)

  if (isLoading) return <div className="flex flex-col items-center justify-center w-full h-screen"><h3 className="font-bold text-xl">Loading...</h3></div>

  const handleDeletePet = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log('Delete Pet Details')
  }
  
  return (
    <>
      <Head>
        <title>Pets Plaza { pet.name && `(${pet.name})` }</title>
      </Head>
      {!pet
        ? <div className="flex flex-col items-center justify-center w-full h-screen space-y-2">
            <h3 className="font-bold text-xl">No Data</h3>
            <Link href="/" className="w-[10rem] px-3 py-1 outline-none rounded-full text-center text-xs text-white border-2 border-green-500 bg-green-400 hover:bg-opacity-50">
              View Records
            </Link>
          </div>
        : <div className="flex flex-col items-center justify-start w-full h-full my-10 space-y-5">
            <div className="flex flex-row items-center justify-between w-full max-w-xl">
              <h1 className="font-bold text-xl uppercase">Pet Plaza (Details)</h1>
              <Link href="/" className="px-3 py-1 outline-none rounded-full text-center text-xs text-white border-2 border-green-500 bg-green-400 hover:bg-opacity-50">
                View Records
              </Link>
            </div>
            <div className="flex-col items-center w-full max-w-xl space-y-2">
              <div className="flex-col w-full space-y-2">
                <span className="text-sm text-neutral-500">Pet Name</span>
                <div className="w-full p-3 outline-none cursor-default border border-neutral-200 bg-white">{ pet.name }</div>
              </div>
              <div className="flex-col w-full space-y-2">
                <span className="text-sm text-neutral-500">Owner</span>
                <div className="w-full p-3 outline-none cursor-default border border-neutral-200 bg-white">{ pet.owner[0]?.name }</div>
              </div>
              <button
                disabled={isDeleteLoading}
                className={`w-full p-3 outline-none text-white border border-red-500 bg-red-500 hover:bg-opacity-50 ${isDeleteLoading ? 'bg-opacity-50' : 'bg-opacity-100'}`}
                onClick={(e) => handleDeletePet(e)}
              >
                {isDeleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
      }
    </>
  )
}

export default View