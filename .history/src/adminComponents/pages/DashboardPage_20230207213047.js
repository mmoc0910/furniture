import React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import Heading from "../components/Heading";

const DashboardPage = () => {
  return (
    <div>
      <Heading heading={"Dashboard"}></Heading>
      <div className="">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={200}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#32776b"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
