import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
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
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const DashboardPage = () => {
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    const colRef = collection(db, "orders");
    const q = query(colRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc, index) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setOrders(data);
    });
  }, []);
  return (
    <div>
      <Heading heading={"Dashboard"}></Heading>
      <div className="">
        <div className="grid grid-cols-2 gap-20 rounded-lg">
          <div className="col-span-1">
            <Revenue data={orders.filter((order) => order.status === 2)} />
          </div>
          <div className="col-span-1">
            <TotalOrder data={orders} />
          </div>
          <div className="col-span-1">
            <TotalProduct />
          </div>
          <div className="col-span-1">
            <TotalUser />
          </div>
        </div>
      </div>
    </div>
  );
};

const Revenue = ({ data }) => {
  const [revenues, setRevenues] = React.useState([]);
  React.useEffect(() => {
    setRevenues(
      [...data].map((item) => ({
        revenue: getRevenueItem(item.products),
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const getRevenueItem = (products) => {
    let revenue = 0;
    [...products].forEach((product) => {
      if (product.productInfo.discountPrice) {
        revenue = revenue + product.qty * product.productInfo.discountPrice;
      } else {
        revenue = revenue + product.qty * product.productInfo.price;
      }
    });
    return revenue;
  };
  const getRevenue = () => {
    let revenue = 0;
    revenues.forEach((item) => (revenue += item.revenue));
    return revenue;
  };
  return (
    <>
      <div className="">
        <p className="text-lg">Doanh thu</p>
        <p className="text-lg font-semibold tracking-widest">{`${getRevenue()
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}VND`}</p>
      </div>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={300} height={100} data={revenues}>
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#16191b"
              strokeWidth={1}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE"];
const TotalOrder = ({ data }) => {
  const [pieData, setPieData] = React.useState([]);
  React.useEffect(() => {
    setPieData([
      {
        name: "Đơn hủy",
        value: [...data].filter(
          (item) =>
            item.status === 0 &&
            (item.cancellationReason.seller || item.cancellationReason.buyer)
        ).length,
      },
      {
        name: "chờ xác nhận",
        value: [...data].filter(
          (item) =>
            item.status === 0 &&
            !item.cancellationReason.seller &&
            !item.cancellationReason.buyer
        ).length,
      },
      {
        name: "Đang giao",
        value: [...data].filter((item) => item.status === 1).length,
      },
      {
        name: "Thành công",
        value: [...data].filter((item) => item.status === 2).length,
      },
    ]);
  }, [data]);
  return (
    <>
      <div className="">
        <p className="text-lg">Đơn hàng</p>
        <p className="text-lg font-semibold tracking-widest">{data.length}</p>
      </div>
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="60%" height="100%">
          <PieChart width={500} height={500}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-5 grid grid-cols-2 max-w-[500px]">
          <div className="flex items-center col-span-1 gap-2">
            <div className="w-8 h-5 bg-[#FF8042]"></div>
            <p>don huy</p>
          </div>
          <div className="flex items-center col-span-1 gap-2">
            <div className="w-8 h-5 bg-[#FF8042]"></div>
            <p>don huy</p>
          </div>
          <div className="flex items-center col-span-1 gap-2">
            <div className="w-8 h-5 bg-[#FF8042]"></div>
            <p>don huy</p>
          </div>
        </div>
      </div>
    </>
  );
};
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const TotalProduct = () => {
  const [totalProducts, setTotalProducts] = React.useState(0);
  React.useEffect(() => {
    const getTotalProducst = async () => {
      const coll = collection(db, "products");
      const query_ = query(coll, where("isDeleted", "==", false));
      const snapshot = await getCountFromServer(query_);
      setTotalProducts(snapshot.data().count);
    };
    getTotalProducst();
  }, []);
  return (
    <>
      <p className="text-lg">Sản phẩm</p>
      <p className="text-lg font-semibold tracking-widest">{totalProducts}</p>
    </>
  );
};

const TotalUser = () => {
  const [totalUser, setTotalUser] = React.useState(0);
  React.useEffect(() => {
    const getTotalProducst = async () => {
      const coll = collection(db, "users");
      const snapshot = await getCountFromServer(coll);
      setTotalUser(snapshot.data().count);
    };
    getTotalProducst();
  }, []);
  return (
    <>
      <p className="text-lg">Khách hàng</p>
      <p className="text-lg font-semibold tracking-widest">{totalUser}</p>
    </>
  );
};

export default DashboardPage;
