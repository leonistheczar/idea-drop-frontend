import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register/')({
  head: () => ({
    meta:[
      {
        title: "Register - IdeasDrop"
      }
    ],
  }),
  component: IdeasRegister,
})

function IdeasRegister() {
  return <div>Hello "/register/"!</div>
}
