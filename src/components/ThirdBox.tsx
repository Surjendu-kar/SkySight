import { Box, Button } from "@mui/material";
import { useState } from "react";
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
  uvIndex: number[];
  allWindSpeed: number[];
};

type DataKey = "Humidity" | "Uv Index" | "WindSpeed";

function getDataTypeKey(dataType: DataKey): string {
  switch (dataType) {
    case "Humidity":
      return "humidity";
    case "Uv Index":
      return "uvIndex";
    case "WindSpeed":
      return "windSpeed";
    default:
      return "";
  }
}

function DataButton({
  active,
  setActive,
  dataType,
}: {
  active: DataKey;
  setActive: (key: DataKey) => void;
  dataType: DataKey;
}) {
  return (
    <Button
      variant="contained"
      size="small"
      sx={{
        color: active === dataType ? "black" : "#c2e9eb",
        backgroundColor: active === dataType ? "#c2e9eb" : "black",
        borderRadius: "20px",
        "&:hover": { backgroundColor: "gray" },
      }}
      onClick={() => setActive(dataType)}
    >
      {dataType}
    </Button>
  );
}

function ThirdBox({
  allHumidity,
  allTime,
  uvIndex,
  allWindSpeed,
}: FirstBoxProps) {
  const [activeData, setActiveData] = useState<DataKey>("Humidity");

  const dataMapping: Record<string, number[]> = {
    humidity: allHumidity,
    uvIndex: uvIndex,
    windSpeed: allWindSpeed,
  };

  const mappedData = dataMapping[getDataTypeKey(activeData)].map(
    (data, index) => ({
      value: data,
      time: allTime[index],
    })
  );

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        marginBottom={"1rem"}
        padding={"0 1.5rem"}
      >
        <Box>
          <h1 style={{ margin: 0, padding: 0 }}>Overview</h1>
        </Box>
        <Box>
          <Box sx={{ backgroundColor: "black", borderRadius: "20px" }}>
            <DataButton
              active={activeData}
              setActive={setActiveData}
              dataType="Humidity"
            />
            <DataButton
              active={activeData}
              setActive={setActiveData}
              dataType="Uv Index"
            />
            <DataButton
              active={activeData}
              setActive={setActiveData}
              dataType="WindSpeed"
            />
          </Box>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={mappedData} margin={{ right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="time" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip
            wrapperStyle={{ backgroundColor: "#f0f0f0", color: "white" }}
            contentStyle={{ color: "white" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#c2e9eb"
            dot={false}
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThirdBox;
