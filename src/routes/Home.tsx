/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect } from "react";
import Sidebar from "./Sidebar";
import { projectFirestore } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

import {
  Avatar,
  Box,
  Card,
  Input,
  Typography,
  Button,
  styled,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import FirstBox from "../components/FirstBox";
import SecondBox from "../components/SecondBox";
import ThirdBox from "../components/ThirdBox";
// import { useAuthContext } from "../hooks/useAuthContext";
import { v4 as uuid } from "uuid";

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

const PrevDataContainer = styled(Card)(() => ({
  minWidth: "7rem",
  height: "4rem",
  padding: "20px",
  margin: "5px",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2e2e39",
}));

const TemperatureBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  minWidth: "100%",
  borderRadius: "20px",
}));

const FirstCol = styled(Box)(() => ({
  flex: 2,
  margin: "10px",
  padding: "10px",
  borderRadius: "20px",
  backgroundColor: "#2e2e39",
  color: "white",
  width: "50%",
}));

type FirestoreDocument = Record<string, any>;
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
  const [allWindSpeed, setAllWindSpeed] = React.useState<number[]>([]);
  const [forecastDays, setForecastDays] = React.useState<number>(3);
  const [prevData, setPrevData] = React.useState<FirestoreDocument[] | null>(
    null
  );
  const [uvIndex, setUvIndex] = React.useState<number[]>([]);
  const [unit, setUnit] = React.useState<"C" | "F">("C");

  const key = import.meta.env.VITE_NASA_API_KEY;
  const cityApi = `https://api.openweathermap.org/geo/1.0/direct?q=${userVal}&limit=5&appid=${key}`;
  const API = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation,rain,cloudcover,windspeed_10m,uv_index`;

  const fetchApi = useCallback(async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (res.ok) {
        console.log("data", data);
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
        setAllWindSpeed(data.hourly.windspeed_10m);
        setUvIndex(data.hourly.uv_index);
      }
    } catch (error) {
      console.log(error);
    }
  }, [API]);

  const fetchCityApi = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(cityApi);
      const data = await res.json();
      if (res.ok && data[0]) {
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

  React.useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchApi();
    }
  }, [latitude, longitude, fetchApi]);

  const handleThreeDaysClick = () => {
    setForecastDays(3);
  };

  const handleSixDaysClick = () => {
    setForecastDays(6);
  };

  const fetchExistingValues = async () => {
    // used to fetch firebase data
    const ref = collection(projectFirestore, "searchval");
    const querySnapshot = await getDocs(ref);
    const existingValues: string[] = [];
    querySnapshot.forEach((doc) => {
      existingValues.push(doc.data().userval);
    });
    console.log(existingValues);
    return existingValues;
  };

  const handleKeyPress = async (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      try {
        await fetchCityApi(e); // First fetch city data
        await fetchApi(); // Then fetch weather data

        console.log("Fetched city data successfully.");
        const existingValues = await fetchExistingValues();

        console.log("Existing values:", existingValues);
        console.log(userVal, temp, existingValues);

        if (userVal && temp && !existingValues.includes(userVal)) {
          const ref = collection(projectFirestore, "searchval");
          const dataToPush = {
            userval: userVal,
            city: city,
            state: state,
            temp: temp,
          };
          console.log("Pushing data to Firestore:", dataToPush);
          await addDoc(ref, dataToPush);
          console.log("Data pushed successfully.");
        } else {
          console.log("Conditions not met to push data to Firestore.");
        }
      } catch (error) {
        console.error("Error in handleKeyPress:", error);
      }
    }
  };

  useEffect(() => {
    getDocs(collection(projectFirestore, "searchval"))
      .then((snapshot) => {
        const results: FirestoreDocument[] = [];
        snapshot.docs.forEach((doc) => {
          results.push(doc.data() as FirestoreDocument);
        });
        temp && setPrevData((prev) => (prev ? [...prev, ...results] : results));
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
      });
  }, [temp]);

  const toFahrenheit = (celsius: number): number => {
    return Math.round(celsius * 9) / 5 + 32;
  };

  return (
    <Layout>
      {/* sidebar */}
      <Sidebar />
      {/* mainbox */}
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
              <Input
                id="search"
                type="text"
                placeholder="🔍Search city"
                sx={{
                  background: "#EEEDED",
                  textAlign: "right",
                  borderRadius: 10,
                  padding: "0 10px",
                  "&:hover": {
                    background: "#DDD",
                  },
                }}
                onChange={(e) => setUserVal(e.target.value)}
                onKeyDown={handleKeyPress}
                value={userVal}
                disableUnderline
                autoComplete="off"
              />
            </Box>
            {/* <Box>lan</Box> */}

            {temp && (
              <Box sx={{ borderRadius: "20px", backgroundColor: "black" }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    color: unit === "C" ? "black" : "#c2e9eb",
                    backgroundColor: unit === "C" ? "#c2e9eb" : "black",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "gray",
                    },
                  }}
                  onClick={() => setUnit("C")}
                >
                  C°
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    color: unit === "F" ? "black" : "#c2e9eb",
                    backgroundColor: unit === "F" ? "#c2e9eb" : "black",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "gray",
                    },
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

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* row-1 */}
          <Box sx={{ display: "flex", minHeight: "25vh" }}>
            {/* Box 1 */}
            <FirstCol>
              <FirstBox
                city={city}
                state={state}
                temp={temp}
                unit={unit}
                humidity={humidity}
                windSpeed={windSpeed}
                allTemp={allTemp}
                allTime={allTime}
              />
            </FirstCol>
            {/* Box 2 */}
            <SecondBox
              latitude={latitude}
              longitude={longitude}
              city={city}
              state={state}
            />
          </Box>

          {/* row-2 */}
          <Box sx={{ display: "flex", maxHeight: "38vh" }}>
            {/* Box 3 */}
            <FirstCol
              sx={{
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
                padding: "10px",
                borderRadius: "20px",
                backgroundColor: "#2e2e39",
                color: "white",
                width: "50%",
              }}
            >
              {allHumidity && (
                <ThirdBox
                  allHumidity={allHumidity}
                  allTime={allTime}
                  uvIndex={uvIndex}
                  allWindSpeed={allWindSpeed}
                />
              )}
            </FirstCol>

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
                <div className="btn">
                  <Box
                    sx={{
                      borderRadius: "20px",
                      backgroundColor: "black",
                    }}
                  >
                    <Button
                      className="btn"
                      size="small"
                      onClick={handleThreeDaysClick}
                      sx={{
                        color: forecastDays === 3 ? "black" : "#c2e9eb",
                        backgroundColor:
                          forecastDays === 3 ? "#c2e9eb" : "black",
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
                      size="small"
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
                  </Box>
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
                        key={uuid()}
                      >
                        <Typography sx={{ fontSize: "1.5rem" }}>
                          +{unit === "C" ? maxTemp : toFahrenheit(maxTemp)}°
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
                            / +{unit === "C" ? minTemp : toFahrenheit(minTemp)}°
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
                borderRadius: "20px",
                backgroundColor: "#1e1f24",
                width: "50%",
                position: "relative", // Step 1: Add relative positioning

                // Step 2: Add the ::after pseudo-element
                "::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "50%", // you can adjust the width as needed
                  backgroundImage:
                    "linear-gradient(to right, transparent, #1e1f24)",
                },
              }}
            >
              <TemperatureBox>
                {prevData?.map((each) => (
                  <PrevDataContainer key={uuid()} sx={{ color: "white" }}>
                    <Typography>{each.userval}</Typography>
                    <Typography fontSize={"1.25rem"}>{each.city}</Typography>
                    <Typography fontSize={"0.65rem"}>{each.state}</Typography>
                    <Box display={"flex"}>
                      <Typography fontSize={"1.25rem"}>{each.temp}</Typography>
                      <Typography component="span" sx={{ fontSize: "1rem" }}>
                        °
                      </Typography>
                    </Box>
                  </PrevDataContainer>
                ))}
              </TemperatureBox>
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
      </MainContainer>
    </Layout>
  );
}

export default Home;
