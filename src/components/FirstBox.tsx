import { Box, Card, Typography, styled } from "@mui/material";
import mainImage from "../images/fog.png";
import coldImage from "../images/snow.png";
import hotImage from "../images/sunny.png";
import mildImage from "../images/cloud1.png";
import { keyframes } from "@emotion/react";

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
    fontSize: "1rem",
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
    fontSize: ".6rem",
  },
}));

const TemperatureBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  minWidth: "100%",
  borderRadius: "20px",

  [theme.breakpoints.down("sm")]: {
    marginTop: "1rem",
  },
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
    minWidth: "3rem",
    minHeight: "5rem",
    padding: "7px",
    margin: "3px",
    borderRadius: "15px",
    gap: '.3rem',
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Img = styled("img")(({ theme }) => ({
  width: "5rem",
  height: "5rem",
  animation: `${fadeIn} 1s ease-in-out`,

  [theme.breakpoints.down("lg")]: {
    width: "3.5rem",
    height: "3.5rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "2.5rem",
    height: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "4rem",
    height: "4rem",
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
    fontSize: ".8rem",
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
    width: "1.6rem",
    height: "1.6rem",
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
    fontSize: ".8rem",
  },
}));

const getWeatherImage = (temperature: number) => {
  if (temperature < 20) {
    return coldImage;
  } else if (temperature >= 20 && temperature <= 27) {
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {/* Image Section */}
          <Box sx={{ flexBasis: '20%', textAlign: 'center' }}>
            <Img src={mainImage} />
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, flex: 1 }}>
            {/* City and State Section */}
            <Box sx={{ flexBasis: '20%' }}>
              <TemperatureContext variant="h5">
                {city ? city : "City not found"}
              </TemperatureContext>
              <Subtitle>{state ? state : "State not found"}</Subtitle>
            </Box>

            {/* Temperature Section */}
            <Box sx={{ flexBasis: '20%' }}>
              <TemperatureContext display="flex">
                +{unit === "C" ? temp : toFahrenheit(Number(temp))}
                <TypographyStyle>°</TypographyStyle>
              </TemperatureContext>
              <Subtitle>Temperature</Subtitle>
            </Box>

            {/* Humidity Section */}
            <Box sx={{ flexBasis: '16.66%' }}>
              <TemperatureContext>
                {humidity && humidity}
                <TypographyStyle>%</TypographyStyle>
              </TemperatureContext>
              <Subtitle>Humidity</Subtitle>
            </Box>

            {/* Wind Speed Section */}
            <Box sx={{ flexBasis: '16.66%' }}>
              <TemperatureContext>
                {windSpeed && windSpeed}
                <TypographyStyle>km/h</TypographyStyle>
              </TemperatureContext>
              <Subtitle>Wind Speed</Subtitle>
            </Box>
          </Box>
        </Box>

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
