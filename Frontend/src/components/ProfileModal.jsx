import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const defaultAvatar = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888888'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

function ProfileModal({ isOpen, onClose, authUser, setAuthUser }) {
  const [avatar, setAvatar] = useState(authUser?.user?.avatar || "");
  const [preview, setPreview] = useState(authUser?.user?.avatar || "");
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const hasChanges = preview !== (authUser?.user?.avatar || "");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!avatar) {
      toast.error("Please select an image first");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(
        `${API_BASE_URL}/user/avatar`,
        { avatar },
        { withCredentials: true }
      );
      
      const updatedAuthUser = { ...authUser, user: res.data.user };
      localStorage.setItem("ChatApp", JSON.stringify(updatedAuthUser));
      setAuthUser(updatedAuthUser);

      toast.success("Avatar updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API_BASE_URL}/user/avatar`, {
        withCredentials: true,
      });

      const updatedAuthUser = { ...authUser, user: res.data.user };
      localStorage.setItem("ChatApp", JSON.stringify(updatedAuthUser));
      setAuthUser(updatedAuthUser);

      setAvatar("");
      setPreview("");
      toast.success("Avatar removed successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to delete avatar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-96 p-6 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white text-center">Profile Settings</h2>

        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-800 bg-slate-800 flex items-center justify-center transition-all group-hover:border-green-500">
              <img
                src={preview || defaultAvatar}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 bg-green-500 text-slate-900 p-2 rounded-full cursor-pointer hover:bg-green-600 hover:scale-110 transition-all shadow-lg flex items-center justify-center border-2 border-slate-900" title="Change Image">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-white">
              {authUser?.user?.fullname || authUser?.user?.name || "User"}
            </h3>
            <p className="text-gray-400 text-sm">{authUser?.user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleSave}
            disabled={loading || !hasChanges}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-800 disabled:text-gray-500 disabled:border disabled:border-slate-800 text-slate-900 font-bold py-2.5 rounded-xl transition-all duration-200"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {authUser?.user?.avatar && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="w-full bg-red-500 bg-opacity-10 hover:bg-opacity-20 text-red-500 font-semibold py-2.5 rounded-xl transition-all duration-200"
            >
              Remove Photo
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-gray-300 py-2.5 rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
export { defaultAvatar };
