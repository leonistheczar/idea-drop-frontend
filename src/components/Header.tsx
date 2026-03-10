import { logOut } from "@/api/auth";
import { useAuth } from "@/context/authContext";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
const IdeasHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {setUser, setAccessToken} = useAuth();
  const [error, setError] = useState(null);
  const { user, setAuthLoading } = useAuth();
  console.log(user);
  const handleSubmit = async () => {
    try {
      await logOut();
      setAccessToken(null);
      setUser(null);
      navigate({to: "/"})
    } catch (err: any) {
      setError(err.message)
    }
    finally{
      setAuthLoading(false);
    }
  }
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
      <div className="flex items-center gap-x-4">
        <Link to="/ideas">
          <p className="text-slate-500 font-semibold text-lg transition hover:text-black">
            Ideas
          </p>
        </Link>
        {user && 
        <Link to="/user">
          <p className="flex items-center gap-x-1 bg-blue-600 text-slate-100 p-1 rounded-md font-semibold text-sm transition hover:bg-blue-700">
          <span>New Idea </span><CirclePlus size={18} strokeWidth={2} />
          </p>
        </Link>
        }
      </div>
      <div className="flex items-center sm:gap-x-2">
        {user ? (
          <>
          <p>Welcome, {user.name}</p>          
        <Link
          to="/"
          onClick={(e) => {e.preventDefault(); 
            if(confirm("Are you sure you want to logout?")){
              handleSubmit();
              }}}
          className={`px-2 py-1 rounded-md transition ${location.pathname === "/login" && user === null ? "bg-slate-200 font-semibold" : user != null ? "text-red-600 hover:bg-red-100" : "hover:bg-slate-200"}`}
        >
          LogOut
        </Link>
          </>
        ) : <>
        <Link
          to="/login"
          className={`px-2 py-1 rounded-md transition ${location.pathname === "/login" && user === null ? "bg-slate-200 font-semibold" : user != null ? "text-red-600 hover:bg-red-100" : "hover:bg-slate-200"}`}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={`${location.pathname === "/register" ? "bg-slate-200 font-semibold" : "hover:bg-slate-200"} px-2 py-1 rounded-md`}
        >
          Register
        </Link>
        </>
        }
      </div>
    </nav>
  );
};
export default IdeasHeader;
