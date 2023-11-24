import { Box, Typography, styled } from "@mui/material";
import { useEffect, useRef } from "react";

import { v4 as uuid } from "uuid";
import moment from "moment";

const getNextNDaysFormatted = (n: number) => {
  const dates = [];
  for (let i = 0; i <= n; i++) {
    const date = moment().add(i, "days");
    const formattedDate = date.format("ddd, Do MMM");
    dates.push(formattedDate);
  }
  return dates;
};

const toFahrenheit = (celsius: number): number => {
  return Math.round(celsius * 9) / 5 + 32;
};

type FourthBoxProps = {
  forecastDays: number;
  allTemp: number[];
  unit: "C" | "F";
  forCastBoxRef: React.RefObject<HTMLDivElement>;
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
  alignItems: "center",

  borderRadius: "20px",
  padding: "0.45rem 1rem",
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

function FourthBox({
  forecastDays,
  allTemp,
  unit,
  forCastBoxRef,
}: FourthBoxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (forecastDays === 6) {
        if (ref?.current) {
          ref.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 500);
  }, [forecastDays]);

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
        const days = getNextNDaysFormatted(forecastDays);
        const dailyTemps = allTemp.slice(
          (dayIndex + 0) * 24,
          (dayIndex + 1) * 24
        );

        const maxTemp = Math.max(...dailyTemps);
        const minTemp = Math.min(...dailyTemps);

        // assign ref to 1st and 4th day
        let finalRef: React.RefObject<HTMLDivElement> | null = null;
        if (dayIndex === 3) {
          finalRef = ref;
        } else if (dayIndex === 0) {
          finalRef = forCastBoxRef;
        }

        return (
          <MainContainer
            key={uuid()}
            ref={finalRef}
          >
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
            <DateBox sx={{ fontSize: "1rem" }}>{days[dayIndex]}</DateBox>
          </MainContainer>
        );
      })}
    </Box>
  );
}

export default FourthBox;
