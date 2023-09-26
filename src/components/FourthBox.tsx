import { Box, Typography, styled } from "@mui/material";

import { v4 as uuid } from "uuid";

const dt = new Date();
const formattedDate = `${dt.toLocaleDateString("en-US", {
  weekday: "short",
})}, ${dt.getDate()} ${dt.toLocaleDateString("en-US", {
  month: "short",
})}, ${dt.getFullYear()}`;

const toFahrenheit = (celsius: number): number => {
  return Math.round(celsius * 9) / 5 + 32;
};

type FourthBoxProps = {
  forecastDays: number;
  allTemp: number[];
  unit: "C" | "F";
};

const Maxtemp = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));

const Mintemp = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.5rem",
  },
}));

const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: "20px",
  padding: "0.45rem",
  margin: "0.25rem",
  backgroundColor: "#1e1f24",
  [theme.breakpoints.down("lg")]: {
    padding: "0.4rem",
    margin: "0.2rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0.3rem",
    margin: "0.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.2rem",
    margin: "0.2rem",
  },
}));

const DateBox = styled(Mintemp)(() => ({}));

function FourthBox({ forecastDays, allTemp, unit }: FourthBoxProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        maxHeight: "11rem",
      }}
    >
      {Array.from({ length: forecastDays }).map((_, dayIndex) => {
        // Start from the next day's temperature
        const dailyTemps = allTemp.slice(
          (dayIndex + 1) * 24,
          (dayIndex + 2) * 24
        );

        const maxTemp = Math.max(...dailyTemps);
        const minTemp = Math.min(...dailyTemps);
        const incrementedDate = Number(formattedDate.slice(5, 7)) + dayIndex;

        return (
          <MainContainer key={uuid()}>
            <Maxtemp>
              +{unit === "C" ? maxTemp : toFahrenheit(maxTemp)}°
            </Maxtemp>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end", // This will align children to the bottom
                flexGrow: 1,
              }}
            >
              <Mintemp>
                / +{unit === "C" ? minTemp : toFahrenheit(minTemp)}°
              </Mintemp>
            </Box>
            <DateBox sx={{ fontSize: "1rem" }}>
              Date - {incrementedDate}
            </DateBox>
          </MainContainer>
        );
      })}
    </Box>
  );
}

export default FourthBox;
