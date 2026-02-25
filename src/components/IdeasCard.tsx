import { Link } from "@tanstack/react-router";
type ideasCardProps = {
  id: number,
  className: string,
  showButton: boolean,
  showHome: boolean,
  lorem: string
}
const IdeasCard = ({id, lorem="", className="", showButton=false, showHome=false}: ideasCardProps) => {
    return ( 
        <div className={`p-3 rounded-md shadow-md/20 ${className}`}>
              {showHome && (
                <div className="mb-4">
                  <Link to="/" className="text-blue-700 hover:underline">Go to home</Link>
                </div>
              )}
              <p>Idea # {id}</p>
              <p className='mb-4'>{lorem}</p>
              <h3>Tags</h3>
              <div className="flex gap-2 my-2"><span className="p-1 text-sm bg-slate-200 rounded-sm">test</span><span className="p-1 text-sm bg-slate-200 rounded-sm">test</span><span className="p-1 text-sm bg-slate-200 rounded-sm">test</span></div>
              {showButton && <Link className='bg-blue-700 inline-block w-full text-center text-white px-4 py-2 rounded-md transition hover:bg-blue-800' to="/ideas/$ideasID" params={{ideasID: String(id)}}>View Idea</Link>}
              </div>
     );
}
 
export default IdeasCard;