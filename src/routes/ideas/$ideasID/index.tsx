import IdeasCard from '@/components/IdeasCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/$ideasID/')({
  head: () => ({
    meta:[
      {
        title: "Ideas by ID - IdeasDrop"
      }
    ],
  }),
  component: ideasDetails,
})

function ideasDetails() {
  return (
    <section className='px-6 sm:px-8 py-10'>
      <div className="container shadow-lg rounded-lg max-w-5xl p-6 bg-white mx-auto">
        <IdeasCard lorem='Lorem ipsum dolor sit amet consectetur adipiscing elit sed.
' id={1} className={"shadow-none"} showButton={false} showHome={true} />
      </div>
    </section>
  )
}
