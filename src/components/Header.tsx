import { Link, useLocation } from "@tanstack/react-router";
const IdeasHeader = () => {
  const location = useLocation();
  return (
    <nav className="p-3 flex sm:justify-around justify-between items-center shadow-md">
      <Link className="flex items-center" to="/">
        <img
          className="w-12 h-12"
          src="/main-logo.svg"
          alt="Main Logo Header"
        />
        <h1 className="font-bold text-2xl">IdeasDrop</h1>
      </Link>
      <div>
        <Link to="/ideas"><p className="text-slate-500 font-semibold text-lg transition hover:text-black">Ideas</p></Link>
      </div>
      <div className="flex sm:gap-x-2">
        <Link to="/login" className={`${location.pathname === "/login" ? "bg-slate-200 font-semibold" : "hover:bg-slate-200"} px-2 py-1 rounded-md transition`}>Login</Link>
        <Link to="/register" className={`${location.pathname === "/register" ? "bg-slate-200 font-semibold" : "hover:bg-slate-200"} px-2 py-1 rounded-md`}>Register</Link>
      </div>
    </nav>
  );
};
export default IdeasHeader;
