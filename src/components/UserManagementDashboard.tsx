import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../Redux/Slices/UsersSlice";
import { RootState } from "../Redux/Store";

import Pagination from "./Pagination";
import Dashboard from "./Dashboard";

import { FaSearch } from "react-icons/fa";

const UserManagementDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerms, setSearchTerms] = useState("");
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId));
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(e.target.value.toLowerCase());
  };
  // Filter users by search term
  const filteredUsers = users.filter(
    (user: { firstName: string; lastName: string; email: string }) =>
      user.firstName.toLowerCase().includes(searchTerms) ||
      user.lastName.toLowerCase().includes(searchTerms) ||
      user.email.toLowerCase().includes(searchTerms)
  );
  console.log(filteredUsers);
  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Dashboard>
      <div>
        <h1 className="text-2xl font-bold mt-5 mb-5">
          User Management Dashboard
        </h1>
        <div className="w-[300px] mb-5 flex gap-2 p-2 items-center border border-slate-500 rounded-md  hover:border-green-500">
          <FaSearch size={20} />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerms}
            onChange={handleSearch}
          />
        </div>

        <table className="w-[90%] text-center h-[300px] border-collapse border border-slate-600 ">
          <thead>
            <tr className="bg-blue-300">
              <th className="border border-slate-600 ">Fname</th>
              <th className="border border-slate-600 ">Lname</th>
              <th className="border border-slate-600 ">Email</th>
              <th className="border border-slate-600 ">Actions</th>
            </tr>
          </thead>
          {currentUsers.length ? (
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border border-slate-600 ">{user.firstName}</td>
                  <td className="border border-slate-600 ">{user.lastName}</td>
                  <td className="border border-slate-600 ">{user.email}</td>
                  <td className="border border-slate-600 ">
                    <button
                      className="hover:text-red-400"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tfoot>
              <tr className="text-xl  text-red-500">
                <td colSpan={4}>No data found!!!</td>
              </tr>
            </tfoot>
          )}
        </table>

        <Pagination
          totalItems={users.length}
          itemsPerPage={usersPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Dashboard>
  );
};

export default UserManagementDashboard;
