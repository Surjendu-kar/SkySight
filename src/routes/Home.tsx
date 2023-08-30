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
} from "@mui/material";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


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
  const [windSpeed, setWindSpeed] = React.useState<string | null>(null);
  const [forecastDays, setForecastDays] = React.useState<number>(3);

  const cityApi = `http://api.openweathermap.org/geo/1.0/direct?q=${userVal}&limit=5&appid=f04c7395ed903d5f8c068e3cbeb068f5`;
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
          data.hourly.time.map((each) => {
            return each.slice(11, 13);
          })
        );
        setHumidity(data.hourly.relativehumidity_2m[new Date().getHours()]);
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

  const dt = new Date();
  const formattedDate = `${dt.toLocaleDateString("en-US", {
    weekday: "short",
  })}, ${dt.getDate()} ${dt.toLocaleDateString("en-US", {
    month: "short",
  })}, ${dt.getFullYear()}`;
  // Output: "Wed, 9 Aug, 2023"

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
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        height: "100dvh",
        backgroundColor: "#1e1f24",
      }}
    >
      {/* sidebar */}
      <Sidebar />
      {/* main */}
      <div style={{ flex: 1 }}>
        {/* header */}
        <div
          style={{
            background: "brown",
            display: "flex",
            justifyContent: "space-between",
            minHeight: "5vh",
            backgroundColor: "#1e1f24",
            color: "white",
          }}
        >
          <div style={{ display: "flex", paddingTop: "7px" }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 24, height: 24, marginRight: "5px" }}
            />
            {formattedDate}
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div>
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
            </div>
            <div>lan</div>
            <div>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "gray",
                }}
              >
                C°
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "gray",
                }}
              >
                F°
              </Button>
            </div>
          </div>
        </div>

        {/* contents */}
        {temp && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* part-1 */}
            <div style={{ display: "flex", minHeight: "35vh" }}>
              <div
                style={{
                  flex: 2,
                  border: "1px solid #000",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "#2e2e39",
                  color: "white",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={3} sx={{ textAlign: "center" }}>
                    <img
                      src="./fog.png"
                      alt=""
                      style={{ width: "5rem", height: "4.5rem" }}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography
                      variant="h5"
                      sx={{ width: "fit-content", fontSize: "2rem" }}
                    >
                      {city ? city : "City not found"}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "0.8rem", width: "fit-content" }}
                    >
                      {state ? state : "State not found"}
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography
                      sx={{
                        fontSize: "2rem",
                        width: "fit-content",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      +{temp ? temp : "Temp not found"}
                      <Typography component="span" sx={{ fontSize: "2rem" }}>
                        °
                      </Typography>
                    </Typography>
                    <Typography
                      sx={{ fontSize: "0.8rem", width: "fit-content" }}
                    >
                      Temperature
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography
                      sx={{
                        fontSize: "2rem",
                        width: "fit-content",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {humidity && humidity}
                      <Typography component="span" sx={{ fontSize: "1rem" }}>
                        %
                      </Typography>
                    </Typography>
                    <Typography
                      sx={{ fontSize: "0.8rem", width: "fit-content" }}
                    >
                      Humidity
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography
                      sx={{
                        fontSize: "2rem",
                        width: "fit-content",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {windSpeed && windSpeed}
                      <Typography component="span" sx={{ fontSize: "1rem" }}>
                        km/h
                      </Typography>{" "}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "0.8rem", width: "fit-content" }}
                    >
                      Wind Speed
                    </Typography>
                  </Grid>
                </Grid>

                <div
                  style={{
                    flex: 2,
                    // border: "1px solid #000",
                    margin: 0,
                    borderRadius: "20px",
                    maxWidth: "800px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      overflowX: "auto",
                    }}
                  >
                    {allTemp.slice(0, 24).map((each, index) => {
                      return (
                        <Card
                          variant="outlined"
                          sx={{
                            minWidth: "40px",
                            height: "70px",
                            padding: "5px",
                            margin: "5px",
                            borderRadius: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#c2e9eb",
                          }}
                          key={index}
                        >
                          <Typography sx={{ fontSize: "12px" }}>
                            {allTime[index] < 12
                              ? `${allTime[index]} am`
                              : `${allTime[index]} pm`}
                          </Typography>
                          <Typography variant="h6" sx={{ fontSize: "15px" }}>
                            {each}
                          </Typography>
                        </Card>
                      );
                    })}
                  </Box>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  // border: "1px solid #000",
                  margin: "10px",
                  padding: "10px",
                  // borderRadius: "20px",
                  backgroundColor:"transparent",
                  color: "white",
                }}
              >
                {latitude && longitude && (
                  <MapContainer
                    key={`${latitude}-${longitude}`} // <-- Add this line
                    center={[latitude, longitude]}
                    zoom={13}
                    style={{ width: "100%", height: "100%",borderRadius: "20px", }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[latitude, longitude]}>
                      <Popup>
                        {city}, {state}
                      </Popup>
                    </Marker>
                  </MapContainer>
                )}
              </div>
            </div>

            {/* part-2 */}
            <div style={{ display: "flex", minHeight: "40vh" }}>
              <div
                style={{
                  flex: 2,
                  border: "1px solid #000",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "#2e2e39",
                  color: "white",
                }}
              >
                left
              </div>

              <div
                style={{
                  flex: 1,
                  border: "1px solid #000",
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
                      border: "1px solid #000",
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
                      height: "170px",
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "nowrap",
                      overflowY: "auto", // This allows for vertical scrolling
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
                            justifyContent: "flex-end",
                            border: "1px solid #000",
                            borderRadius: 5,
                            minWidth: "100px",
                            height: "100px",
                            padding: "5px",
                            margin: "10px",
                            backgroundColor: "#1e1f24",
                          }}
                          key={dayIndex}
                        >
                          <Typography sx={{ fontSize: "100%" }}>
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
                            <Typography sx={{ fontSize: "60%" }}>
                              / {minTemp}°
                            </Typography>
                            <Typography sx={{ fontSize: "16px" }}>
                              {incrementedDate}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </div>
            </div>

            {/* part-3 */}
            <div style={{ display: "flex", minHeight: "20vh" }}>
              <div
                style={{
                  flex: 2,
                  border: "1px solid #000",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "#2e2e39",
                  color: "white",
                }}
              >
                left
              </div>
              <div
                style={{
                  flex: 1,
                  border: "1px solid #000",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "20px",
                  backgroundColor: "#2e2e39",
                  color: "white",
                }}
              >
                right
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
