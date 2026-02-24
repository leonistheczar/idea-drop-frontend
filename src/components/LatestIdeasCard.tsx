import { Link } from "@tanstack/react-router";
type latestIdeasCardProps = {
    id: number,
}
const LatestIdeasCard = ({id}: latestIdeasCardProps) => {
    return ( 
        <div className='p-3 rounded-md shadow-md/10'>
        <p className="font-semibold text-blue-800 text-lg">Idea # {id}</p>
        <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, tenetur?</p>
        <Link className="text-blue-700 text-sm hover:underline" to="/ideas/$ideasID" params={{ideasID: String(id)}}>Read More...</Link>
        </div>
     );
}
 
export default LatestIdeasCard;