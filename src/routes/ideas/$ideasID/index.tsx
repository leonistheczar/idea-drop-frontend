import api from '@/api/api';
import IdeasDetailsCard from '@/components/IdeasDetailsCard';
import type { Ideas } from '@/types';
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import { useState } from 'react';
const fetchDataById = async (ideaID: string) => {
  try {
    const res = await api.get(`/ideas/${ideaID}`);
    if(!res.data) throw new Error("Failed to fetch ideas");
    return res.data;
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.error("Error fetching...", error.response?.data || error.message);
      throw error;
    }
  }
}
export const Route = createFileRoute('/ideas/$ideasID/')({
  head: () => ({
    meta:[
      {
        title: "Ideas by ID - IdeasDrop"
      }
    ],
  }),
  component: ideasDetails,
  loader: async ({ params }) => {
    return fetchDataById(params.ideasID);
  }
})

function ideasDetails() {
  const data = Route.useLoaderData();
  const [idea, setIdea] = useState<Ideas>(data);
  console.log(idea);
  return (
    <section className='p-6 sm:p-8'>
      <div className="container rounded-lg max-w-5xl p-2 mx-auto">
        <IdeasDetailsCard idea={idea} className={"shadow-none"} showHome={true} />
      </div>
    </section>
  )
}
