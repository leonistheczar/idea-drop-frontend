import { fetchData } from "@/api/api";
import IdeasCard from "@/components/IdeasCard";
import type { Ideas } from "@/types";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
const ideasQueryOptions = () => queryOptions({
  queryKey: ["ideas"],
  queryFn: () => fetchData()
})
export const Route = createFileRoute("/ideas/")({
  head: () => ({
    meta: [
      {
        title: "Browse Ideas - IdeasDrop",
      },
    ],
  }),
  component: IdeasPage,
  loader: async ({context: {queryClient}}) => {
    return queryClient.ensureQueryData(ideasQueryOptions());
  }
});

function IdeasPage() {
  const { data } = useSuspenseQuery(ideasQueryOptions());
  const [ideas, setIdeas] = useState<Ideas[]>(data);
  return (
    <section className="px-6 sm:px-8 py-10">
      <div className="container shadow-lg rounded-lg max-w-5xl p-6 bg-white mx-auto">
        <h1 className="font-bold text-2xl">Ideas</h1>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <IdeasCard
            ideas={ideas}
            className=""
            showButton={true}
            showHome={false}
          />
        </div>
      </div>
    </section>
  );
}
