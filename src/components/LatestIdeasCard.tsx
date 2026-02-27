import type { Ideas } from "@/types";
import { Link } from "@tanstack/react-router";
type latestIdeasCardProps = {
    ideas: Ideas[]
}
const LatestIdeasCard = ({ideas}: latestIdeasCardProps) => {
    return (
        <>
          {ideas.map((idea) => (
            <div key={idea.id} className='p-3 rounded-md shadow-md/10'>
              <p className='my-1 font-semibold'>{idea.title}</p>
              <p className='mb-2'>{idea.description.split(" ").slice(0,6).join(" ")+"..."}</p>
              <Link
                className="text-blue-700 text-sm hover:underline"
                to="/ideas/$ideaID"
                params={{ ideaID: String(idea.id) }}
              >
                Read More...
              </Link>
            </div>
          ))}
        </>
      );
}
 
export default LatestIdeasCard;