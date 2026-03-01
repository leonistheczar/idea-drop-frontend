import IdeasDetailsCard from '@/components/IdeasDetailsCard';
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { deleteIdea, fetchDatabyID } from '@/api/api';

const ideasQueryOptions = (ideaID: string) =>
  queryOptions({
    queryKey: ['ideas', ideaID],
    queryFn: () => fetchDatabyID(ideaID),
  });

export const Route = createFileRoute('/ideas/$ideaID/')({
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions(params.ideaID));
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData.title} - IdeasDrop`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { ideaID } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideasQueryOptions(ideaID));

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteIdea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      queryClient.removeQueries({ queryKey: ['ideas', ideaID] });
      navigate({ to: '/' });
    },
  });

  return (
    <section className="p-6 sm:p-8">
      <div className="container rounded-lg max-w-5xl p-2 mx-auto">
        <IdeasDetailsCard
          id={ideaID}
          pendingState={isPending}
          deleteMutate={deleteMutate}
          idea={idea}
          className="shadow-none"
          showHome={true}
        />
      </div>
    </section>
  );
}
