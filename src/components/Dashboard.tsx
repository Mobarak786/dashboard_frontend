import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { BsLayoutTextSidebar } from "react-icons/bs";
interface Dashboardprops {
  children: ReactNode;
}
const Dashboard: React.FC<Dashboardprops> = ({ children }) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* sidebar for small devices */}
      <div
        className={
          hidden
            ? "hidden"
            : "pt-[50px] w-[200px] h-screen absolute left-0 top-0 bg-gray-200 z-10"
        }
      >
        <div className="w-full h-10 pl-5 flex items-center hover:bg-slate-50 text-md font-semibold">
          <Link to="/" className="hover:text-blue-500">
            User Management
          </Link>
        </div>
        <div className="w-full h-10 pl-5 flex items-center hover:bg-slate-50 text-md font-semibold">
          <Link to="/analytics" className="hover:text-blue-500">
            Analytics
          </Link>
        </div>
      </div>

      {/*siderbar popup button  for small devices*/}
      <BsLayoutTextSidebar
        className="absolute right-2 top-2 w-7 h-7 sm:hidden"
        onClick={() => setHidden(!hidden)}
      />

      {/* sider bar for large devices */}
      <div className="hidden md:block md:w-[250px] pt-5 bg-slate-200  border-black">
        <div className="w-full h-10 pl-5 flex items-center hover:bg-slate-50 text-md font-semibold">
          <Link to="/" className="hover:text-blue-500">
            User Management
          </Link>
        </div>
        <div className="w-full h-10 pl-5 flex items-center hover:bg-slate-50 text-md font-semibold">
          <Link to="/analytics" className="hover:text-blue-500">
            Analytics
          </Link>
        </div>
      </div>
      <div className="h-screen w-full bg-slate-50 p-5 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
