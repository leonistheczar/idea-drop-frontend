import IdeasCard from '@/components/IdeasCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/')({
  head: () => ({
    meta:[
      {
        title: "Browse Ideas - IdeasDrop"
      }
    ],
  }),
  component: IdeasPage,
})

function IdeasPage() {
  return (
    <section className='px-8 py-10'>
      <div className="container shadow-lg rounded-lg max-w-5xl p-6 bg-white mx-auto">
        <h1 className='font-bold text-2xl'>Ideas</h1>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <IdeasCard id={1}/>
          <IdeasCard id={2}/>
        </div>
      </div>
    </section>
  )
}
