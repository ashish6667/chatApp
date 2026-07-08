import React, { useState } from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";
import { useAuth } from "../../context/AuthProvider";
import ProfileModal, { defaultAvatar } from "../../components/ProfileModal";

function Left() {
  const [authUser, setAuthUser] = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="w-[30%] h-screen bg-black text-gray-300 flex flex-col justify-between">
      <div className="flex-1 flex flex-col min-h-0">
        <Search />
        <Users />
      </div>
      
      <div className="flex justify-between items-center px-6 py-4 bg-slate-950 border-t border-slate-900">
        <Logout />
        
        <div className="flex items-center space-x-3 max-w-[70%]">
          <span 
            className="text-sm font-semibold text-gray-300 truncate max-w-[120px]"
            title={`${authUser?.user?.fullname || authUser?.user?.name} (You)`}
          >
            {authUser?.user?.fullname || authUser?.user?.name} (You)
          </span>
          
          {/* Profile Avatar Button */}
          <div 
            onClick={() => setIsProfileOpen(true)}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-800 bg-slate-800 hover:border-green-500 hover:scale-105 duration-300 cursor-pointer flex items-center justify-center shrink-0"
            title="Profile Settings"
          >
            <img 
              src={authUser?.user?.avatar || defaultAvatar} 
              alt="My Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {isProfileOpen && (
        <ProfileModal 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
          authUser={authUser} 
          setAuthUser={setAuthUser}
        />
      )}
    </div>
  );
}

export default Left;
