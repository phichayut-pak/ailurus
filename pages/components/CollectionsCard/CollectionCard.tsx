import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image'

interface CollectionCardProps {
  key: any,
  title: string,
  content: string | null,
  image_url: string
}

const CollectionCard: FC<CollectionCardProps> = ({ title, content, image_url }) => {

  const [editedContent, setEditedContent] = useState<string | null>('')

  useEffect(() => {
    if(content) {

    
      if(content.length > 80) {
        const splittedContent = content.split('')
        const splittedFilteredContent: string[] = []
      
        for(const i of splittedContent) {
          if(splittedFilteredContent.length !== 80) {
            splittedFilteredContent.push(i)
          }
        }

        const joinedFilteredContent = splittedFilteredContent.join('')
        setEditedContent(joinedFilteredContent)

      } else {
        setEditedContent(content)
      } 
    } else {
      setEditedContent(null)
    }
  }, [content])

  return (
    <div className='w-64 h-96 grid grid-rows-2 bg-white shadow-lg '>
      <div className="row-span-1 inline-flex bg-main">
        <Image src={image_url} width={400} height={400} alt='collection image'></Image>
        hi
      </div>
      <div className="row-span-1 relative ">
        <div className="absolute inset-3 flex flex-col justify-start items-start space-y-5">
          <div className='font-notoThai text-3xl font-bold text-ellipsis overflow-hidden whitespace-pre-line'>
            { title }
          </div>

          { content && (
            <div className="w-full font-notoThai font-medium text-md text-inputBorder overflow-hidden whitespace-pre-line">
              { editedContent }
            </div>
          )}

          { !content && (
            <>
            <div className="font-notoThai font-medium text-md text-inputBorder text-ellipsis overflow-hidden whitespace-pre-line">
              ไม่มีเนื้อหา
            </div>
            
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default CollectionCard