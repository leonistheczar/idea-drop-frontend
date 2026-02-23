import { Link } from "@tanstack/react-router";
const IdeasHeader = () => {
  return (
    <nav className="p-3 flex justify-around items-center shadow-md">
      <Link className="flex items-center" to="/">
        <img
          className="w-12 h-12"
          src="/main-logo.svg"
          alt="Main Logo Header"
        />
        <h1 className="font-bold text-2xl">IdeasDrop</h1>
      </Link>
      <div>
        <Link to="/ideas"><p className="font-semibold">Ideas</p></Link>
      </div>
      <div className="flex gap-x-6">
        <Link to="/login" className="px-2 py-1 rounded-md transition hover:bg-slate-200">Login</Link>
        <Link to="/register" className="bg-slate-200 px-2 py-1 rounded-md font-semibold">Register</Link>
      </div>
    </nav>
  );
};
export default IdeasHeader;
