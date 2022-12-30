import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

const Record = () => {
  React.useEffect(() => {
    Router.replace('/')
  }, [])
  return (
    <>
      <Head>
        <title>Pets Plaza</title>
      </Head>
    </>
  )
}

export default Record
