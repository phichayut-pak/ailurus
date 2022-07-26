import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import axios from 'axios'
import { useRouter } from 'next/router'
import CollectionCard from '../components/CollectionsCard/CollectionCard'



const CollectionsPage: NextPage = () => {
  type Collections = {
    id: any
    title: string,
    content: string | null,
    image_url: string
  }[]

  const [collections, setCollections] = useState<Collections>([])
  const { query } = useRouter()

  useEffect(() => {
    const fetchCollections = async () => {
      const response = await axios.get(`/api/getCollections/${query.email}`)
      const data = await response.data

      setCollections(data.collections)
    }

    fetchCollections()
  }, [query.email])


  return (
    <div className='h-screen w-screen pt-36 grid grid-cols-1 md:grid-cols-2 desktop:grid-cols-4 justify-items-center items-start gap-y-10  '>
      {collections.length > 0 && collections.map(collection => {
        return (<CollectionCard key={collection.id} title={collection.title} content={collection.content} image_url={collection.image_url} />)
      })}
    </div>
  )
}

export const getServerSideProps: any = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)
  const { query } = context

  if(session?.user?.email !== query.email) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login'
      }
    }
  }
  return {
    props: {
      session
    }
  }
}

export default CollectionsPage