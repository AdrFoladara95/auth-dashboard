import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { LogoutUser, GetUser} from "../api/api"
import { useState, useEffect} from "react";



export default function DashboardLayout() {
  const navigate = useNavigate();

  // const [user] = useState (() => {
  //   const savedUser =sessionStorage.getItem('user')
  //   return savedUser ? JSON.parse(savedUser) : null

  // })
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/")
  //   }
  // }, [user, navigate])

 useEffect(() => {
    async function fetchUser() {
       try {
          const response = await GetUser();
          console.log("User response:", response);
          if (!response) {
            navigate("/");
            return;
          }
          setUser(response);

        } catch (error) {
            console.error("GetUser error:", error);
            navigate("/");
        }
    }

    fetchUser();
}, [navigate]);

  

  async function handleLogout() {
    try{
      await LogoutUser()
    } catch(error) {
      console.error("Logout failed", error )
    } finally {
      sessionStorage.removeItem('user')
      navigate("/");
    }
    
  }

  return (
    <div className="min-h-screen bg-gray-100 flex text-gray-900">

      {/* Sidebar */}
      <aside className="w-64 min-h-screen p-5 bg-indigo-50 border-r  text-gray-700  border-indigo-100 flex flex-col">
        <h1 className="text-2xl font-bold text-indigo-600 mb-8">
          My Dashboard
        </h1>
        <nav className="space-y-2">

          <NavLink to="/dashboard"
            end
            className={({ isActive }) =>`block px-4 py-3 rounded-lg ${isActive ? "bg-indigo-500 text-white" : "text-gray-700 hover:bg-indigo-100"}`}>
              Dashboard
          </NavLink>

          <NavLink to="/dashboard/profile"
            className={({ isActive }) =>`block px-4 py-3 rounded-lg ${isActive ? "bg-indigo-500 text-white": "text-gray-700 hover:bg-indigo-100"}`}>
             Profile
          </NavLink>

          <NavLink to="/dashboard/settings"
            className={({ isActive }) => `block px-4 py-3 rounded-lg ${isActive ? "bg-indigo-500 text-white": "text-gray-700 hover:bg-indigo-100" }`}>
              Settings
          </NavLink>

          <NavLink to="/dashboard/notifications"
            className={({ isActive }) =>`block px-4 py-3 rounded-lg ${isActive? "bg-indigo-500 text-white": "text-gray-700 hover:bg-indigo-100"}`}>
              Notifications
          </NavLink>
                        
        </nav> 
        <button
          onClick={handleLogout}
          className="mt-auto w-full px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600  text-white">
            Logout
        </button>                           
                                    
                      
      </aside>    

       
      {/* Main area */}
      <div className="flex-1">

        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="font-semibold text-gray-900">
            Welcome back, {''} <span className="uppercase text-indigo-600">{user?.data.firstName} </span> {''} 👋
          </h2>
          <img 
          src={user?.avatarUrl || "/images.png"} 
          alt="Profile" 
          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"/>
        </header>
                

        {/* Page content */}
        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}