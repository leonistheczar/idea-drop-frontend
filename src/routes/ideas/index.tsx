import api from "@/api/api";
import IdeasCard from "@/components/IdeasCard";
import type { Ideas } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useState } from "react";
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
export const Route = createFileRoute("/ideas/")({
  head: () => ({
    meta: [
      {
        title: "Browse Ideas - IdeasDrop",
      },
    ],
  }),
  component: IdeasPage,
  loader: () => {
    return fetchData();
  }
});

function IdeasPage() {
  const data = Route.useLoaderData();
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
