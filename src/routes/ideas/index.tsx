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
    <section className='px-6 sm:px-8 py-10'>
      <div className="container shadow-lg rounded-lg max-w-5xl p-6 bg-white mx-auto">
        <h1 className='font-bold text-2xl'>Ideas</h1>
        <div className='grid sm:grid-cols-2 gap-4 mt-4'>
          <IdeasCard id={1} className='' showButton={true} showHome={false}/>
          <IdeasCard id={2} className='' showButton={true} showHome={false}/>
        </div>
      </div>
    </section>
  )
}
