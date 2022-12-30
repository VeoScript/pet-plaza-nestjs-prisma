import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRegisterPet } from '../helpers/react-query/mutation'

const Register = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [petName, setPetName] = React.useState<string>('')
  const [ownerName, setOwnerName] = React.useState<string>('')
  const [petNameError, setPetNameError] = React.useState<string>('')
  const [ownerNameError, setOwnerNameError] = React.useState<string>('')

  const registerPet = useRegisterPet()

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (petName === '') return setPetNameError('Pet name is required.')
    if (ownerName === '') return setOwnerNameError('Owner name is required.')

    setIsLoading(true)

    await registerPet.mutateAsync({
      petName,
      ownerName
    },
    {
      onError: () => {
        setIsLoading(false)
      },
      onSuccess: () => {
        setIsLoading(false)
        setPetName('')
        setOwnerName('')
        setPetNameError('')
        setOwnerNameError('')
      }
    })
  }

  return (
    <>
      <Head>
        <title>Pets Plaza (Register)</title>
      </Head>
      <div className="flex flex-col items-center justify-start w-full h-full my-10 space-y-5">
        <div className="flex flex-row items-center justify-between w-full max-w-xl">
          <h1 className="font-bold text-xl uppercase">Pet Plaza</h1>
          <Link href="/" className="px-3 py-1 outline-none rounded-full text-center text-xs text-white border-2 border-green-500 bg-green-400 hover:bg-opacity-50">
            View Records
          </Link>
        </div>
        <form className="flex-col items-center w-full max-w-xl space-y-2">
          <div className="flex-col w-full space-y-2">
            <label htmlFor="petname">Pet Name</label>
            <input
              type="text"
              id="petname"
              className="w-full p-3 outline-none border border-neutral-200 bg-white focus:border-blue-400"
              value={petName}
              onChange={(e) => {
                setPetName(e.currentTarget.value)
                setPetNameError('')
              }}
            />
            {petNameError && (<span className="text-sm text-red-500">{ petNameError }</span>)}
          </div>
          <div className="flex-col w-full space-y-2">
            <label htmlFor="ownername">Owner Name</label>
            <input
              type="text"
              id="ownername"
              className="w-full p-3 outline-none border border-neutral-200 bg-white focus:border-blue-400"
              value={ownerName}
              onChange={(e) => {
                setOwnerName(e.currentTarget.value)
                setOwnerNameError('')
              }}
            />
            {ownerNameError && (<span className="text-sm text-red-500">{ ownerNameError }</span>)}
          </div>
          <button
            disabled={isLoading}
            className={`w-full p-3 outline-none text-white border border-blue-500 bg-blue-500 hover:bg-opacity-50 ${isLoading ? 'bg-opacity-50' : 'bg-opacity-100'}`}
            onClick={(e) => handleRegister(e)}
          >
            {isLoading ? 'Processing...' : 'Register'}
          </button>
        </form>
      </div>
    </>
  )
}

export default Register