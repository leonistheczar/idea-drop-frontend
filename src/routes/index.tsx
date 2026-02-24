import LatestIdeasCard from '@/components/LatestIdeasCard'
import { createFileRoute, Link } from '@tanstack/react-router'
export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
      <section className='px-8 py-10'>
        <div className="container shadow-lg rounded-lg grid sm:grid-cols-2 gap-6 max-w-5xl p-6 bg-white mx-auto">
          <div className='flex flex-col gap-y-4'>
          <div className='flex flex-col justify-center'>
          <img className='w-24 h-24' src="/main-logo.svg" alt="Main Logo" />
          <h1 className='text-3xl font-bold'>Welcome to, Ideas Drop</h1>
          </div>
          <p>Share, explore and build on the best startup ideas and side hustles</p>
          </div>
          <div className='p-2'>
            <h2 className='font-bold text-xl text-center'>Latest Ideas</h2>
              {/* Dynamially Inserted Ideas */}
              <div className='flex flex-col gap-y-2'>
            <LatestIdeasCard id={1}/>
            <LatestIdeasCard id={2}/>
            <LatestIdeasCard id={3}/>
              </div>
            <Link className='bg-blue-700 mt-4 inline-block w-full text-center text-white px-4 py-2 rounded-md transition hover:bg-blue-800' to="/ideas">View All Ideas</Link>
          </div>
        </div>
      </section>
  )
}
