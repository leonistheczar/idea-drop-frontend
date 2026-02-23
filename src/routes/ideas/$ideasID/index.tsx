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
  return <div>Hello "/ideas/$ideasID/"!</div>
}
