import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/')({
  head: () => ({
    meta:[
      {
        title: "Login - IdeasDrop"
      }
    ],
  }),
  component: IdeasLogin,
})

function IdeasLogin() {
  return <div>Hello "/login/"!</div>
}
