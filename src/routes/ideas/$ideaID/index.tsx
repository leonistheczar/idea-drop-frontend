import api from '@/api/api';
import IdeasDetailsCard from '@/components/IdeasDetailsCard';
import type { Ideas } from '@/types';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
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
const ideasQueryOptions = (ideaID: string) => queryOptions({
  queryKey: ["ideas", ideaID],
  queryFn: () => fetchDataById(ideaID)
})
export const Route = createFileRoute('/ideas/$ideaID/')({
  head: () => ({
    meta:[
      {
        title: "Ideas by ID - IdeasDrop"
      }
    ],
  }),
  component: ideasDetails,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions(params.ideaID))
  }
})

function ideasDetails() {
  const { ideaID } = Route.useParams();
  const {data:idea, status, fetchStatus} = useSuspenseQuery(ideasQueryOptions(ideaID));
  console.log(status, fetchStatus)
  const [fetchIdea, setFetchIdea] = useState<Ideas>(idea);
  return (
    <section className='p-6 sm:p-8'>
      <div className="container rounded-lg max-w-5xl p-2 mx-auto">
        <IdeasDetailsCard idea={fetchIdea} className={"shadow-none"} showHome={true} />
      </div>
    </section>
  )
}
