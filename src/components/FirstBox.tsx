import { Box, Card, Grid, Typography, styled } from "@mui/material";
import mainImage from "../images/fog.png";
import coldImage from "../images/snow.png";
import hotImage from "../images/sunny.png";
import mildImage from "../images/rainy-day.png";

const TemperatureContext = styled(Typography)(({ theme }) => ({
  width: "fit-content",
  fontSize: "1.8rem",

  [theme.breakpoints.down("lg")]: {
    fontSize: "1.4rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));
const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  width: "fit-content",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.55rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.45rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.40rem",
  },
}));

const TemperatureBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  minWidth: "100%",
  borderRadius: "20px",
}));

const toFahrenheit = (celsius: number): number => {
  return Math.round(celsius * 9) / 5 + 32;
};

const CardContainer = styled(Card)(({ theme }) => ({
  minWidth: "3rem",
  height: "100px",
  padding: "7px",
  margin: "5px",
  borderRadius: "25px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#c2e9eb",
  [theme.breakpoints.down("lg")]: {
    minWidth: "2.5rem",
    height: "5rem",
    padding: "7px",
    margin: "5px",
    borderRadius: "20px",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "2rem",
    height: "3.5rem",
    padding: "7px",
    margin: "4px",
    borderRadius: "18px",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "1.5rem",
    height: "3rem",
    padding: "7px",
    margin: "3px",
    borderRadius: "15px",
  },
}));

const TypographyStyle = styled("span")(({ theme }) => ({
  fontSize: "1.5rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.5rem",
  },
}));
const Img = styled("img")(({ theme }) => ({
  width: "5rem",
  height: "5rem",
  [theme.breakpoints.down("lg")]: {
    width: "3.5rem",
    height: "3.5rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "2.5rem",
    height: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "2rem",
    height: "2rem",
  },
}));
const Time = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.65rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.55rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.45rem",
  },
}));
const TempImg = styled("img")(({ theme }) => ({
  width: "2rem",
  height: "2rem",
  [theme.breakpoints.down("lg")]: {
    width: "1.5rem",
    height: "1.5rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "1rem",
    height: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "0.95rem",
    height: "0.95rem",
  },
}));
const TempStyle = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.65rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
  },
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
            <Img src={mainImage} />
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
              <TypographyStyle>°</TypographyStyle>
            </TemperatureContext>
            <Subtitle>Temperature</Subtitle>
          </Grid>

          <Grid item xs={2}>
            <TemperatureContext>
              {humidity && humidity}
              <TypographyStyle>%</TypographyStyle>
            </TemperatureContext>
            <Subtitle>Humidity</Subtitle>
          </Grid>

          <Grid item xs={2}>
            <TemperatureContext>
              {windSpeed && windSpeed}
              <TypographyStyle>km/h</TypographyStyle>{" "}
            </TemperatureContext>
            <Subtitle>Wind Speed</Subtitle>
          </Grid>
        </Grid>
      </Box>
      <TemperatureBox>
        {allTemp.slice(0, 24).map((each, index) => {
          return (
            <CardContainer variant="outlined" key={index}>
              <Time>
                {allTime[index] < 12
                  ? `${allTime[index]} am`
                  : `${allTime[index]} pm`}
              </Time>
              <TempImg src={getWeatherImage(each)} alt="Weather Icon" />
              <TempStyle>{unit === "C" ? each : toFahrenheit(each)}°</TempStyle>
            </CardContainer>
          );
        })}
      </TemperatureBox>
    </Box>
  );
}

export default FirstBox;
