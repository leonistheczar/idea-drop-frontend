import type { Ideas } from "@/types";
import { Link } from "@tanstack/react-router";

type ideasCardProps = {
  className?: string;
  showHome?: boolean;
  idea: Ideas;
};

const IdeasDetailsCard = ({ idea, className = "", showHome = false }: ideasCardProps) => {
  const ideasDate = (new Date(idea.createdAt).toISOString().slice(0,10));
  return (
    <>
      {idea && (
        <div
          key={idea.id}
          className={`bg-white border border-gray-200 p-6 rounded-xl shadow-lg ${className} transition hover:shadow-xl`}
        >
          {showHome && (
            <div className="mb-4">
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 font-medium transition hover:underline"
              >
                ← Back to Home
              </Link>
            </div>
          )}

          <p className="text-gray-500 text-sm mb-1">Idea # {idea.id}</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{idea.title}</h2>
          <p className="text-gray-700 mb-3">{idea.summary}</p>
          <p className="text-gray-600 mb-4">{idea.description}</p>

          {idea.tags && idea.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {idea.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-400 text-xs mt-4">
            Created at: {ideasDate}
          </p>
        </div>
      )}
    </>
  );
};

export default IdeasDetailsCard;