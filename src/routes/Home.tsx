/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import Sidebar from "./Sidebar";
import {
  Avatar,
  Box,
  Card,
  Input,
  Typography,
  Grid,
  Button,
  styled,
} from "@mui/material";

import coldImage from "../images/snow.png";
import hotImage from "../images/sunny.png";
import mildImage from "../images/rainy-day.png";
import mainImage from "../images/fog.png";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import { useAuthContext } from "../hooks/useAuthContext";

const Layout = styled(Box)(() => ({
  display: "flex",
  alignItems: "stretch",
  minHeight: "100vh",
  backgroundColor: "#1e1f24",
}));

const Navbar = styled(Box)(() => ({
  background: "brown",
  display: "flex",
  justifyContent: "space-between",
  minHeight: "5vh",
  backgroundColor: "#1e1f24",
  color: "white",
  padding: "0 10px",
}));

const MainContainer = styled(Box)(() => ({
  flex: "1",
  overflow: "hidden",
}));

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

const TemperatureContext = styled(Typography)(() => ({
  width: "fit-content",
  fontSize: "2rem",
}));

const Subtitle = styled(Typography)(() => ({
  fontSize: "0.75rem",
  width: "fit-content",
}));

const Map = styled(Box)(() => ({
  flex: 1,
  margin: "10px",
  padding: "10px",
  backgroundColor: "transparent",
  color: "white",
}));

function Home() {
  const [userVal, setUserVal] = React.useState("");
  const [latitude, setLatitude] = React.useState<number | null>(null);
  const [longitude, setLongitude] = React.useState<number | null>(null);
  const [city, setCity] = React.useState<string | null>(null);
  const [state, setState] = React.useState<string | null>(null);
  const [temp, setTemp] = React.useState<string | null>(null);
  const [allTemp, setAllTemp] = React.useState<number[]>([]);
  const [allTime, setAllTime] = React.useState<number[]>([]);
  const [humidity, setHumidity] = React.useState<string | null>(null);
  const [allHumidity, setAllHumidity] = React.useState<number[] | null>(null);
  const [windSpeed, setWindSpeed] = React.useState<string | null>(null);
  const [forecastDays, setForecastDays] = React.useState<number>(3);

  const [unit, setUnit] = React.useState<"C" | "F">("C");

  const toFahrenheit = (celsius: number): number => {
    return (celsius * 9) / 5 + 32;
  };

  const key = import.meta.env.VITE_NASA_API_KEY;
  const cityApi = `https://api.openweathermap.org/geo/1.0/direct?q=${userVal}&limit=5&appid=${key}`;
  const API = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation,rain,cloudcover,windspeed_10m`;

  const fetchApi = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setTemp(data.hourly.temperature_2m[new Date().getHours()]);
        setAllTemp(data.hourly.temperature_2m);
        setAllTime(
          data.hourly.time.map((each: string) => {
            return each.slice(11, 13);
          })
        );
        setHumidity(data.hourly.relativehumidity_2m[new Date().getHours()]);
        setAllHumidity(data.hourly.relativehumidity_2m);
        setWindSpeed(data.hourly.windspeed_10m[new Date().getHours()]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCityApi = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(cityApi);
      const data = await res.json();
      if (res.ok && data[0]) {
        // console.log(data);

        setLatitude(data[0].lat);
        setLongitude(data[0].lon);
        setCity(data[0].name);
        setState(data[0].state);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherImage = (temperature: number) => {
    if (temperature < 10) {
      return coldImage;
    } else if (temperature >= 10 && temperature <= 25) {
      return mildImage;
    } else {
      return hotImage;
    }
  };

  const dt = new Date();
  const formattedDate = `${dt.toLocaleDateString("en-US", {
    weekday: "short",
  })}, ${dt.getDate()} ${dt.toLocaleDateString("en-US", {
    month: "short",
  })}, ${dt.getFullYear()}`;

  React.useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchApi();
    }
  }, [latitude, longitude]);

  const handleThreeDaysClick = () => {
    setForecastDays(3);
  };

  const handleSixDaysClick = () => {
    setForecastDays(6);
  };

  return (
    <Layout>
      {/* sidebar */}
      <Sidebar />
      {/* main */}
      <MainContainer>
        {/* navbar */}
        <Navbar>
          <Box sx={{ display: "flex", paddingTop: "0.75rem" }}>
            {/* {user && user.displayName} */}
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 24, height: 24, marginRight: "5px" }}
            />
            <Typography fontSize={"1rem"}>{formattedDate}</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "1rem", paddingTop: "0.5rem" }}>
            <Box>
              <form
                onSubmit={(e) => {
                  fetchCityApi(e);
                }}
              >
                <Input
                  id="search"
                  type="text"
                  placeholder="🔍Search city"
                  sx={{
                    background: "#EEEDED",
                    textAlign: "right",
                    borderRadius: 10,
                  }}
                  onChange={(e) => {
                    setUserVal(e.target.value);
                  }}
                  value={userVal}
                  disableUnderline
                />
              </form>
            </Box>
            {/* <Box>lan</Box> */}

            {temp && (
              <Box>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    color: unit === "C" ? "black" : "#c2e9eb",
                    backgroundColor: unit === "C" ? "#c2e9eb" : "black",
                  }}
                  onClick={() => setUnit("C")}
                >
                  C°
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    color: unit === "F" ? "black" : "#c2e9eb",
                    backgroundColor: unit === "F" ? "#c2e9eb" : "black",
                  }}
                  onClick={() => setUnit("F")}
                >
                  F°
                </Button>
              </Box>
            )}
          </Box>
        </Navbar>

        {/* contents */}
        {temp && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* row-1 */}
            <Box sx={{ display: "flex", minHeight: "25vh" }}>
              {/* Box 1 */}
              <Box
                sx={{
                  flex: 2,
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "#2e2e39",
                  color: "white",
                  width: "50%",
                }}
              >
                <Box height={"50%"}>
                  <Grid container spacing={2}>
                    <Grid item xs={3} sx={{ textAlign: "center" }}>
                      <img
                        src={mainImage}
                        alt=""
                        style={{ width: "5rem", height: "5rem" }}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <TemperatureContext variant="h5">
                        {city ? city : "City not found"}
                      </TemperatureContext>
                      <Subtitle>{state ? state : "State not found"}</Subtitle>
                    </Grid>

                    <Grid item xs={2}>
                      <TemperatureContext display={"flex"}>
                        +{unit === "C" ? temp : toFahrenheit(Number(temp))}
                        <Typography component="span" sx={{ fontSize: "2rem" }}>
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
                          {unit === "C" ? each : toFahrenheit(each)}
                        </Typography>
                      </CardContainer>
                    );
                  })}
                </TemperatureBox>
              </Box>

              {/* Box 2 */}
              <Map>
                {latitude && longitude && (
                  <MapContainer
                    key={`${latitude}-${longitude}`} // <-- Add this line
                    // @ts-ignore
                    center={[latitude, longitude]}
                    zoom={13}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                    }}
                  >
                    <TileLayer
                      // @ts-ignore
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      // @ts-ignore
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[latitude, longitude]}>
                      <Popup>
                        {city}, {state}
                      </Popup>
                    </Marker>
                  </MapContainer>
                )}
              </Map>
            </Box>

            {/* row-2 */}
            <Box sx={{ display: "flex", maxHeight: "38vh" }}>
              {/* Box 3 */}
              <Box
                sx={{
                  flex: 2,
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "#2e2e39",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50%",
                }}
              >
                {allHumidity && (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                      data={allHumidity.map(
                        (humidity: number, index: number) => ({
                          humidity,
                          time: allTime[index],
                        })
                      )}
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
                )}
              </Box>

              {/* Box 4 */}
              <Box
                sx={{
                  flex: 1,
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "#2e2e39",
                  color: "white",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <h1 style={{ margin: 0, padding: 0 }}>ForeCast</h1>
                  <div
                    className="btn"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "black",
                    }}
                  >
                    <Button
                      className="btn"
                      onClick={handleThreeDaysClick}
                      sx={{
                        color: forecastDays === 3 ? "black" : "#c2e9eb",
                        backgroundColor:
                          forecastDays === 3 ? "#c2e9eb" : "black",
                        border: "1px solid #000",
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: "gray",
                        },
                      }}
                    >
                      3 days
                    </Button>
                    <Button
                      className="btn"
                      onClick={handleSixDaysClick}
                      sx={{
                        color: forecastDays === 6 ? "black" : "#c2e9eb",
                        backgroundColor:
                          forecastDays === 6 ? "#c2e9eb" : "black",
                        border: "1px solid #000",
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: "gray",
                        },
                      }}
                    >
                      6 days
                    </Button>
                  </div>
                </Box>

                {allTemp && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      overflowY: "auto",
                      maxHeight: "12rem",
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
                      const incrementedDate =
                        Number(formattedDate.slice(5, 7)) + dayIndex;

                      return (
                        <Box
                          sx={{
                            display: "flex",
                            borderRadius: 5,
                            padding: "0.5rem",
                            margin: "0.25rem",
                            backgroundColor: "#1e1f24",
                          }}
                          key={dayIndex}
                        >
                          <Typography sx={{ fontSize: "1.5rem" }}>
                            +{maxTemp}°
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-end", // This will align children to the bottom
                              flexGrow: 1,
                            }}
                          >
                            <Typography sx={{ fontSize: "1rem" }}>
                              / {minTemp}°
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: "1rem" }}>
                            Date - {incrementedDate}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            </Box>

            {/* row-3 */}
            <Box sx={{ display: "flex", minHeight: "18vh" }}>
              {/* Box 5 */}
              <Box
                sx={{
                  flex: 2,
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "#2e2e39",
                  color: "white",
                }}
              >
                left
              </Box>
              <Box
                sx={{
                  flex: 1,
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "#2e2e39",
                  color: "white",
                }}
              >
                right
              </Box>
            </Box>
          </Box>
        )}
      </MainContainer>
    </Layout>
  );
}

export default Home;
