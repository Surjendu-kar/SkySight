import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type FirstBoxProps = {
  allHumidity: number[];
  allTime: number[];
};

function ThirdBox({ allHumidity, allTime }: FirstBoxProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={allHumidity.map((humidity: number, index: number) => ({
          humidity,
          time: allTime[index],
        }))}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
        <XAxis dataKey="time" stroke="white" />
        <YAxis stroke="white" />
        <Tooltip
          wrapperStyle={{
            backgroundColor: "#f0f0f0",
            color: "white",
          }}
          contentStyle={{ color: "white" }}
        />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#c2e9eb"
          dot={false} // This line removes the dots
          activeDot={{ r: 8 }}
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ThirdBox;
