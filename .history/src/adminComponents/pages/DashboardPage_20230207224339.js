import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Heading from "../components/Heading";
import {
  collection,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const data = [
  {
    price: 0,
  },
  {
    price: 45875,
  },
  {
    price: 12545,
  },
  {
    price: 11188,
  },
  {
    price: 25850,
  },
  {
    price: 0,
  },
];
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
const DashboardPage = () => {
  React.useEffect(() => {
    const colRef = collection(db, "orders");
    onSnapshot(colRef, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc, index) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      console.log(data);
    });
  }, []);
  return (
    <div>
      <Heading heading={"Dashboard"}></Heading>
      <div className="">
        <div className="grid grid-cols-4 px-5 py-5 bg-[#32776b] rounded-lg text-white gap-14">
          <div className="col-span-1">
            <div className="">
              <p className="text-lg">Doanh thu</p>
              <p className="text-lg font-semibold tracking-widest">
                100.000VND
              </p>
            </div>
            <div className="w-full h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#fff"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-1">
            <div className="">
              <p className="text-lg">Đơn hàng</p>
              <p className="text-lg font-semibold tracking-widest">100</p>
            </div>
            <div className="w-full h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#fff"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-1">
            <div className="">
              <p className="text-lg">Sản phẩm</p>
              <p className="text-lg font-semibold tracking-widest">10</p>
            </div>
            <div className="w-full h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#fff"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-1">
            <div className="">
              <p className="text-lg">Khách hàng</p>
              <p className="text-lg font-semibold tracking-widest">100</p>
            </div>
            <div className="w-full h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#fff"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RevenueChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="price"
          stroke="#fff"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DashboardPage;
