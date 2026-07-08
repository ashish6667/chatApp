import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = allUsers.find((user) =>
      (user.fullname || user.name || user.email)?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-5 py-3 w-full">
      <input
        type="text"
        className="h-9 outline-none rounded-md w-full px-2 bg-gray-800 text-white "
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="rounded-full overflow-hidden">
        <FaSearch className="text-3xl hover:bg-gray-600 rounded-full duration-300" />
      </button>
    </form>
  );
}

export default Search;
