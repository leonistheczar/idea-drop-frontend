import IdeasDetailsCard from '@/components/IdeasDetailsCard';
import type { Ideas } from '@/types';
import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { deleteIdea, fetchDatabyID } from '@/api/api';
const ideasQueryOptions = (ideaID: string) => queryOptions({
  queryKey: ["ideas", ideaID],
  queryFn: () => fetchDatabyID(ideaID)
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
  const navigate = useNavigate();
  const { ideaID } = Route.useParams();
  const {data:idea} = useSuspenseQuery(ideasQueryOptions(ideaID));
  const [fetchIdea, setFetchIdea] = useState<Ideas>(idea);
  const { mutateAsync:deleteMutate, isPending } = useMutation({
    mutationFn: (ideaID: string) => deleteIdea(ideaID),
    onSuccess: () => {
      navigate({to: "/"});
    }
  })
  return (
    <section className='p-6 sm:p-8'>
      <div className="container rounded-lg max-w-5xl p-2 mx-auto">
        <IdeasDetailsCard id={ideaID} pendingState={isPending} deleteMutate={deleteMutate} idea={fetchIdea} className={"shadow-none"} showHome={true} />
      </div>
    </section>
  )
}

