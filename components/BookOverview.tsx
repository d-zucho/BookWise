import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}: Book) => {
  return (
    <section className='book-overview'>
      <div className='flex flex-1 flex-col lg:flex-row gap-10 lg:gap-5'>
        <div className='flex flex-1 flex-col'>
          <div className='book-info'>
            <h1>{title}</h1>
            <p>
              By: <span className='font-semibold text-light-200'>{author}</span>
            </p>
            <p>
              Category:{' '}
              <span className='font-semibold text-light-200'>{genre}</span>
            </p>
            <div className='flex flex-row gap-1'>
              <Image
                src={'/icons/star.svg'}
                width={22}
                height={22}
                alt='star'
              />
              <p>{rating}</p>
            </div>
          </div>
          <div className='book-copies'>
            <p>
              Total Books: <span>{totalCopies}</span>
            </p>
            <p>
              Available Books: <span>{availableCopies}</span>
            </p>
            <p className='book-description'>
              Description: <span>{description}</span>
            </p>
            <Button className='book-overview_btn'>
              <Image
                src={'/icons/book.svg'}
                width={20}
                height={20}
                alt='book'
              />
              <span className='font-bebas-neue text-xl'>
                Borrow Book Request
              </span>
            </Button>
          </div>
        </div>

        <div className='relative flex flex-1 justify-center'>
          <div className='relative'>
            <BookCover
              variant='wide'
              className='z-10'
              coverColor={coverColor}
              coverUrl={coverUrl}
            />

            <div className='absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden blur-sm'>
              <BookCover
                variant='wide'
                coverColor={coverColor}
                coverUrl={coverUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookOverview
