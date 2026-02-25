import api from '@/api/api';
import LatestIdeasCard from '@/components/LatestIdeasCard'
import { createFileRoute, Link } from '@tanstack/react-router'
import axios from 'axios';
import { useState } from 'react';
const fetchData = async () => {
  try {
    const res = await api.get("/ideas");
    if(!res.data) throw new Error("Failed to fetch ideas");
    return res.data;
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.error("Error fetching...", error.response?.data || error.message);
      throw error;
    }
  }
}
export const Route = createFileRoute('/')({ 
  component: App,
  loader: () => {
    return fetchData();
  } 
})
function App() {
  const data = Route.useLoaderData();
  const [ideas, setIdeas] = useState(data);
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
            <LatestIdeasCard ideas={ideas}/>
              </div>
            <Link className='bg-blue-700 mt-4 inline-block w-full text-center text-white px-4 py-2 rounded-md transition hover:bg-blue-800' to="/ideas">View All Ideas</Link>
          </div>
        </div>
      </section>
  )
}
