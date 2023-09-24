import { Box, Card, Grid, Typography, styled } from "@mui/material";
import mainImage from "../images/fog.png";
import coldImage from "../images/snow.png";
import hotImage from "../images/sunny.png";
import mildImage from "../images/rainy-day.png";

const TemperatureContext = styled(Typography)(({ theme }) => ({
  width: "fit-content",
  fontSize: "2rem",
  [theme.breakpoints.down("xl")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.7rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.8rem",
  },
}));
const Subtitle = styled(Typography)(() => ({
  fontSize: "0.75rem",
  width: "fit-content",
}));
const toFahrenheit = (celsius: number): number => {
  return Math.round(celsius * 9) / 5 + 32;
};

const CardContainer = styled(Card)(() => ({
  minWidth: "50px",
  height: "100px",
  padding: "7px",
  margin: "5px",
  borderRadius: "25px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#c2e9eb",
}));

const TemperatureBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  minWidth: "100%",
  borderRadius: "20px",
}));

const getWeatherImage = (temperature: number) => {
  if (temperature < 10) {
    return coldImage;
  } else if (temperature >= 10 && temperature <= 25) {
    return mildImage;
  } else {
    return hotImage;
  }
};

type FirstBoxProps = {
  city: string | null;
  state: string | null;
  temp: string | null;
  unit: string | null;
  humidity: string | null;
  windSpeed: string | null;
  allTemp: number[];
  allTime: number[];
};

function FirstBox({
  city,
  state,
  temp,
  unit,
  humidity,
  windSpeed,
  allTemp,
  allTime,
}: FirstBoxProps) {
  return (
    <Box>
      <Box height={"50%"}>
        <Grid container spacing={2}>
          <Grid item xs={3} sx={{ textAlign: "center" }}>
            <img
              src={mainImage}
              alt=""
              style={{ width: "5rem", height: "5rem" }}
            />
          </Grid>

          <Grid item xs={2.5}>
            <TemperatureContext variant="h5">
              {city ? city : "City not found"}
            </TemperatureContext>
            <Subtitle>{state ? state : "State not found"}</Subtitle>
          </Grid>

          <Grid item xs={2.5}>
            <TemperatureContext display={"flex"}>
              +{unit === "C" ? temp : toFahrenheit(Number(temp))}
              <Typography component="span" sx={{ fontSize: "1.5rem" }}>
                °
              </Typography>
            </TemperatureContext>
            <Subtitle>Temperature</Subtitle>
          </Grid>

          <Grid item xs={2}>
            <TemperatureContext>
              {humidity && humidity}
              <Typography component="span" sx={{ fontSize: "1rem" }}>
                %
              </Typography>
            </TemperatureContext>
            <Subtitle>Humidity</Subtitle>
          </Grid>

          <Grid item xs={2}>
            <TemperatureContext>
              {windSpeed && windSpeed}
              <Typography component="span" sx={{ fontSize: "1rem" }}>
                km/h
              </Typography>{" "}
            </TemperatureContext>
            <Subtitle>Wind Speed</Subtitle>
          </Grid>
        </Grid>
      </Box>
      <TemperatureBox>
        {allTemp.slice(0, 24).map((each, index) => {
          return (
            <CardContainer variant="outlined" key={index}>
              <Typography sx={{ fontSize: "12px" }}>
                {allTime[index] < 12
                  ? `${allTime[index]} am`
                  : `${allTime[index]} pm`}
              </Typography>
              <img
                src={getWeatherImage(each)}
                alt="Weather Icon"
                style={{ width: "2rem", height: "2rem" }}
              />
              <Typography variant="h6" sx={{ fontSize: "15px" }}>
                {unit === "C" ? each : toFahrenheit(each)}°
              </Typography>
            </CardContainer>
          );
        })}
      </TemperatureBox>
    </Box>
  );
}

export default FirstBox;
