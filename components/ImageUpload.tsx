'use client'
import config from '@/lib/config'
import { ImageKitProvider, IKUpload, IKImage } from 'imagekitio-next'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

const { publicKey, urlEndpoint } = config.env.imagekit

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

    if (!response.ok) {
      const errorText = await response.text()

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      )
    }

    const data = await response.json()
    const { signature, expire, token } = data
    return { token, expire, signature }
  } catch (err: any) {
    throw new Error(`Error in authenticator: ${err.message}`)
  }
}

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void
}) => {
  const ikUploadRef = useRef(null)
  const [file, setfile] = useState<{ filePath: string } | null>(null)

  const onError = (error: any) => {
    console.log(`Error uploading file: ${error}`)
    toast.error('Image was not upladed. Please try again.')
  }
  const onSuccess = (res: any) => {
    setfile(res)
    onFileChange(res.filePath)

    toast.success('Image uploaded successfully')
  }

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName='test-upload.png'
      />

      <button
        type='button'
        className='upload-btn bg-dark-300'
        onClick={(e) => {
          e.preventDefault()
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current.click()
          }
        }}
      >
        <Image
          src='/icons/upload.svg'
          width={20}
          height={20}
          alt='Upload'
          className='object-contain'
        />
        <p className='text-base text-light-100'>Upload a file</p>
        {file && <p className='upload-filename'>{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload
