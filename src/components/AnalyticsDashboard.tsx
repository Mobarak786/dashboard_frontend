import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { fetchAnalytics } from "../Redux/Slices/AnalyticsSlice";
import Dashboard from "./Dashboard";

import {
  PieChart,
  Pie,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#FF6384", "#36A2EB"];

const AnalyticsDashboard: React.FC = () => {
  const dispatch = useDispatch();

  const { metrics, chartData } = useSelector(
    (state: RootState) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return (
    <Dashboard>
      <div>
        <h1 className="text-2xl font-bold mt-5 mb-5">Analytics Dashboard</h1>
        <div className="w-full flex justify-between mb-10">
          {Object.entries(metrics).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-center items-center w-[100px] md:w-[300px] md:h-[100px]"
              style={{
                backgroundColor:
                  key === "totalUsers"
                    ? "#fef08a"
                    : key === "activeUsers"
                    ? "#86efac"
                    : "#fca5a5",
              }}
            >
              <h3 className=" text-sm p-1 md:text-2xl font-bold ">{`${key} : ${value}`}</h3>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="80%" height={300}>
            <LineChart data={chartData.registrationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Users" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          <h3 className="mt-5 mb-5 text-md md:text-xl ">
            User Registration Trend
          </h3>
        </div>

        <div className="flex flex-col items-center">
          <ResponsiveContainer width="80%" height={300}>
            <BarChart data={chartData.usersByRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <h3 className="mt-5 mb-5 text-md md:text-xl ">Users by Region</h3>
        </div>

        <div className="flex flex-col items-center">
          <ResponsiveContainer width="80%" height={300}>
            <PieChart>
              <Pie
                data={chartData.activeInactive}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="users"
                label
              >
                {Object.values(chartData.activeInactive).map(
                  (_, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <h3 className="mt-5 mb-5 text-md md:text-xl ">
            Active vs Inactive Users{" "}
          </h3>
        </div>
      </div>
    </Dashboard>
  );
};

export default AnalyticsDashboard;
