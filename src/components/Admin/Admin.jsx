
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import Swal from "sweetalert2";

function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        const response = await fetch("https://backend-virid-phi.vercel.app/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire("Error", "Could not fetch users", "error");
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      Swal.fire("Error", "Could not sign out", "error");
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = await auth.currentUser.getIdToken();
      await fetch(`https://backend-virid-phi.vercel.app/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (auth.currentUser.uid === userId) {
        handleLogout();
      } else {
        setUsers(users.filter(user => user.id !== userId));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error", "Could not delete user", "error");
    }
  };

  const handleBlock = async (userId) => {
    try {
      const token = await auth.currentUser.getIdToken();
      await fetch(`https://backend-virid-phi.vercel.app/api/users/${userId}/block`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => user.id === userId ? { ...user, status: "blocked" } : user));
      Swal.fire("Blocked!", "User has been blocked.", "success");
    } catch (error) {
      console.error("Error blocking user:", error);
      Swal.fire("Error", "Could not block user", "error");
    }
  };

  const handleUnblock = async (userId) => {
    try {
      const token = await auth.currentUser.getIdToken();
      await fetch(`https://backend-virid-phi.vercel.app/api/users/${userId}/unblock`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => user.id === userId ? { ...user, status: "active" } : user));
      Swal.fire("Unblocked!", "User has been unblocked.", "success");
    } catch (error) {
      console.error("Error unblocking user:", error);
      Swal.fire("Error", "Could not unblock user", "error");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="container mx-auto">
        
          <h2 className="text-5xl text-center font-bold text-blue-600 italic underline my-10">User Management</h2>
          <div className=" flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
          </div>
        <div className="overflow-x-auto my-10 bg-white shadow-md rounded">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-blue-300">
                  <input type="checkbox" />
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-blue-300">
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-blue-300">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-blue-300">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-blue-300">
                  Registration Time
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-blue-300">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-blue-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <input type="checkbox" />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.registrationTime}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.status}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleBlock(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Block
                    </button>
                    <button
                      onClick={() => handleUnblock(user.id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                    >
                      Unblock
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
