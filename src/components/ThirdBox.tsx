import { styled } from "@mui/material";
import { Box, Typography } from "@mui/material";
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
const Heading = styled(Typography)(({ theme }) => ({
  padding: 0,
  margin: 0,
  fontFamily: "Roboto",
  fontSize: "2rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.55rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
    margin: "0 0.5rem 0 0",
  },
}));

const ButtonStyle = styled("button")(({ theme }) => ({
  backgroundColor: "black",
  borderRadius: "20px",
  border: "1px solid transparent",
  fontSize: "0.9rem",
  padding: "8px",
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.4rem",
    padding: "2px",
  },
}));

const MainContainer = styled(Box)(({ theme }) => ({
  height: "10rem",
  [theme.breakpoints.down("lg")]: {
    height: "8rem",
  },
  [theme.breakpoints.down("md")]: {
    height: "6rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "5rem",
  },
}));

const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
  padding: "0 0.7rem",
  // [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {
    padding: "0 0.25rem",
  },
}));

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
    <ButtonStyle
      sx={{
        color: active === dataType ? "black" : "#c2e9eb",
        backgroundColor: active === dataType ? "#c2e9eb" : "black",
        borderRadius: "20px",
        "&:hover": { backgroundColor: "gray" },
      }}
      onClick={() => setActive(dataType)}
    >
      {dataType}
    </ButtonStyle>
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
    <Box>
      <BoxContainer>
        <Box>
          <Heading>Overview</Heading>
        </Box>
        <Box>
          <Box
            sx={{
              borderRadius: "20px",
            }}
            display='flex'
            gap={.5}
          >
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
      </BoxContainer>
      <MainContainer>
        <ResponsiveContainer width="100%">
          <LineChart
            data={mappedData}
            margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="time" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip
              contentStyle={{
                background: "rgba(0,0,0,.7)",
                color: "#fff",
                border: 'none',
                borderRadius: 10
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#c2e9eb"
              dot={false}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </MainContainer>
    </Box>
  );
}

export default ThirdBox;
