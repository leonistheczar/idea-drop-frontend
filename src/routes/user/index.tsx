import api from "@/api/api";
import { FloatingInput } from "@/components/FloatingInput";
import { FloatingMessageInput } from "@/components/FloatingMessageInput";
import IdeasCard from "@/components/IdeasCard";
import type { Ideas } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { CirclePlus, House, Lightbulb, SquarePen } from "lucide-react";
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
export const Route = createFileRoute("/user/")({
  component: RouteComponent,
  loader: async () => fetchData()
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const [ideas, setIdeas] = useState<Ideas[]>(data);
  const [activeTab, setActiveTab] = useState("home");
  const slicedIdeas = ideas.slice(0,4);
  return (
    <section className="mt-4 bg-gray-50 max-w-4xl mx-auto p-4">
      <div className=" ">
        <div className="w-full max-w-5xl bg-white rounded-xl drop-shadow-md border border-gray-100 grid sm:grid-cols-[.75fr_2fr]">
          <aside className="bg-slate-100 border-r border-slate-200">
            <ul className="flex flex-col">
              {/* Home */}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("home");
                  }}
                  className="flex items-center gap-3 w-full p-4 text-left
        border-b border-slate-200
        transition-colors duration-150
        hover:bg-slate-200 cursor-pointer"
                >
                  <House size={20} />
                  <span>Home</span>
                </button>
              </li>

              {/* Create Idea */}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("create-idea");
                  }}
                  className="flex items-center gap-3 w-full p-4 text-left
        border-b border-slate-200
        transition-colors duration-150
        hover:bg-slate-200 cursor-pointer"
                >
                  <SquarePen size={20} />
                  <span>Create an idea</span>
                </button>
              </li>

              {/* Ideas */}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("ideas");
                  }}
                  className="flex items-center gap-3 w-full p-4 text-left
        border-b border-slate-200
        transition-colors duration-150
        hover:bg-slate-200 cursor-pointer"
                >
                  <Lightbulb size={18} />
                  <span>Ideas</span>
                </button>
              </li>
            </ul>
          </aside>
            {activeTab === "home" && (
              <div className=" py-6 px-4">
                <h1 className="text-2xl text-center font-semibold mb-6">Hi, Alex 👋</h1>
                <div className="flex flex-col items-center rounded-lg shadow-sm border border-gray-300 p-4">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    User Stats
                  </h2>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-3xl text-center font-bold">12</p>
                      <p className="text-xs text-gray-700">Ideas</p>
                    </div>
                    <div>
                      <p className="text-3xl text-center font-bold">7</p>
                      <p className="text-xs text-gray-700">Published</p>
                    </div>
                    <div>
                      <p className="text-3xl text-center font-bold">5</p>
                      <p className="text-xs text-gray-700">Drafts</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "create-idea" && (
              <div className="container py-6 px-4">
                <h1 className="text-2xl font-semibold mb-6">Create an idea</h1>
                <form className="flex flex-col justify-center gap-3 max-w-2xl">
                  <FloatingInput
                    label="Idea Title"
                    id="idea-title"
                    name="idea-title"
                    type="text"
                  />
                  <FloatingInput
                    label="Idea Summary"
                    id="idea-summary"
                    name="idea-summary"
                    type="text"
                  />
                  <FloatingMessageInput
                    label="Idea Description"
                    id="idea-desc"
                    name="idea-desc"
                  />
                  <FloatingInput
                    label="Tags"
                    id="idea-tags"
                    name="idea-tags"
                    type="text"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 mt-1 p-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors duration-100 cursor-pointer"
                  >
                    <CirclePlus size={18} />
                    Create Idea
                  </button>
                </form>
              </div>
            )}

            {activeTab === "ideas" && (
              <div className="container py-6 px-4">
                <h1 className="text-2xl font-semibold mb-6">Ideas</h1>
                <div className="grid grid-cols-2 gap-3">
                    <IdeasCard
                    ideas={slicedIdeas}
                    className=""
                    showButton={true}
                    showHome={false}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
    </section>
  );
}
