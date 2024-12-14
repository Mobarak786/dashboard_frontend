import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Metrics {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
}

interface ChartData {
  registrationTrend: any;
  activeInactive: any;
  usersByRegion: any;
}

interface AnalyticsState {
  metrics: Metrics;
  chartData: ChartData;
}

const initialState: AnalyticsState = {
  metrics: { totalUsers: 0, activeUsers: 0, deletedUsers: 0 },
  chartData: {
    registrationTrend: {},
    activeInactive: {},
    usersByRegion: {},
  },
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setMetrics(state, action: PayloadAction<Metrics>) {
      state.metrics = action.payload;
    },
    setChartData(state, action: PayloadAction<ChartData>) {
      state.chartData = action.payload;
    },
  },
});

export const fetchAnalytics = (): any => async (dispatch: any) => {
  // Mock data fetching
  const metrics = { totalUsers: 100, activeUsers: 70, deletedUsers: 30 };
  const chartData = {
    registrationTrend: [
      { month: "Jan", Users: 10 },
      { month: "Feb", Users: 20 },
      { month: "Mar", Users: 10 },
      { month: "Apr", Users: 30 },
      { month: "May", Users: 20 },
      { month: "Jun", Users: 10 },
    ],
    activeInactive: [
      { name: "Active", users: 70 },
      { name: "Inactive", users: 30 },
    ],
    usersByRegion: [
      { Region: "North", users: "30" },
      { Region: "South", users: "10" },
      { Region: "East", users: "20" },
      { Region: "West", users: "10" },
    ],
  };

  dispatch(setMetrics(metrics));
  dispatch(setChartData(chartData));
};

export const { setMetrics, setChartData } = analyticsSlice.actions;
export default analyticsSlice.reducer;
