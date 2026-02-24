import { Link } from "@tanstack/react-router";
type ideasCardProps = {
  id: number,
  className: string,
  showButton: boolean,
  showHome: boolean,
}
const IdeasCard = ({id, className="", showButton=false, showHome=false}: ideasCardProps) => {
    return ( 
        <div className={`p-3 rounded-md shadow-md/20 ${className}`}>
              {showHome && (
                <div className="mb-4">
                  <Link to="/" className="text-blue-700 hover:underline">Go to home</Link>
                </div>
              )}
              <p>Idea # {id}</p>
              <p className='mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores velit animi soluta optio, quasi ut, expedita minus modi nisi facilis fuga inventore laudantium architecto nam quibusdam assumenda mollitia sint earum!</p>
              {showButton && <Link className='bg-blue-700 inline-block w-full text-center text-white px-4 py-2 rounded-md transition hover:bg-blue-800' to="/ideas/$ideasID" params={{ideasID: String(id)}}>View Idea</Link>}
              </div>
     );
}
 
export default IdeasCard;