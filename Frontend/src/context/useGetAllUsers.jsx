import React, { useEffect, useState } from "react";
import axios from "axios";

function useGetAllUsers() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/user/allusers`, {
          withCredentials: true,
        });
        setAllUsers(response.data);
      } catch (error) {
        console.log("Error in useGetAllUsers :" + error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [API_BASE_URL]);

  return [allUsers, loading];
}

export default useGetAllUsers;
