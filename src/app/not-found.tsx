import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='bg-red-200 w-screen h-screen flex items-center justify-center'>
    <div className='w-full bg-black max-w-xl m-auto p-5 items-center gap-3 rounded-md flex flex-col border-2 border-red-300'>
      <h2 className='text-white text-5xl text-center'>Not Found</h2>
      <p className='text-white text-base'>Could not find requested resource</p>
      <Link href="/" className='px-4 py-2 bg-lime-700 rounded-md hover:scale-105 transition-all divide-purple-200 text-white'>Return Home</Link>
    </div>
    </div>
  )
}