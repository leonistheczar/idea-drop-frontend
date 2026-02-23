import { Link } from "@tanstack/react-router";
type ideasCardProps = {
  id: number,
}
const IdeasCard = ({id}: ideasCardProps) => {
    return ( 
        <div className='border p-3 rounded-md border-gray-600'>
              <p>Idea # {id}</p>
              <p className='mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores velit animi soluta optio, quasi ut, expedita minus modi nisi facilis fuga inventore laudantium architecto nam quibusdam assumenda mollitia sint earum!</p>
            <Link className='bg-blue-700 inline-block w-full text-center text-white px-4 py-2 rounded-md transition hover:bg-blue-800' to="/ideas/$ideasID" params={{ideasID: String(id)}}>View Idea</Link>
              </div>
     );
}
 
export default IdeasCard;