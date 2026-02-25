import { Link } from "@tanstack/react-router";
import type { Ideas } from "@/types";
type ideasCardProps = {
  className: string;
  showButton: boolean;
  showHome: boolean;
  ideas: Ideas[];
};
const IdeasCard = ({
  ideas,
  className = "",
  showButton = false,
  showHome = false,
}: ideasCardProps) => {
  return (
    <>
      {ideas.map((idea) => (
        <div
          key={idea.id}
          className={`p-3 rounded-md shadow-md/20 ${className}`}
        >
          {showHome && (
            <div className="mb-4">
              <Link to="/" className="text-blue-700 hover:underline">
                Go to home
              </Link>
            </div>
          )}
          <p className="font-semibold">Idea # {idea.id}</p>
          <div className="flex flex-col gap-y-2 my-2">
            <p className="">{idea.title}</p>
            <p className="">{idea.summary}</p>
          </div>
          {showButton && (
            <Link
              className="bg-blue-700 inline-block w-full text-center text-white px-4 py-2 rounded-md transition hover:bg-blue-800"
              to={`/ideas/$ideasID`}
              params={{ ideasID: String(idea.id) }}
            >
              View Idea
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default IdeasCard;
