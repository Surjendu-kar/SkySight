/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect } from "react";
import Sidebar from "./Sidebar";
import { projectFirestore } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { Avatar, Box, Input, Typography, styled } from "@mui/material";
import "leaflet/dist/leaflet.css";
import FirstBox from "../components/FirstBox";
import SecondBox from "../components/SecondBox";
import ThirdBox from "../components/ThirdBox";

import { useAuthContext } from "../hooks/useAuthContext";
import FifthBox from "../components/FifthBox";
import FourthBox from "../components/FourthBox";

const Layout = styled(Box)(() => ({
  display: "flex",
  alignItems: "stretch",
  minHeight: "100vh",
  backgroundColor: "#1e1f24",
}));

const Navbar = styled(Box)(({ theme }) => ({
  background: "brown",
  display: "flex",
  justifyContent: "space-between",
  maxHeight: "5vh",
  backgroundColor: "#1e1f24",
  color: "white",
  padding: "0 10px",
  marginTop: "10px",
  [theme.breakpoints.down("md")]: {
    maxHeight: "3vh",
  },
}));

const MainContainer = styled(Box)(() => ({
  flex: "1",
  overflow: "hidden",
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

const StyledInput = styled(Input)(({ theme }) => ({
  background: "#EEEDED",
  fontSize: "1rem",
  padding: "0 10px",
  textAlign: "right",
  borderRadius: 10,
  "&:hover": {
    background: "#DDD",
  },

  [theme.breakpoints.down("lg")]: {
    fontSize: "14px",
    padding: "0 8px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
    padding: "0 7px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
    padding: "0 2px",
  },
}));

const StyledSkySight = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto",
  margin: 0,
  padding: 0,
  fontSize: "2rem", // default for larger screens

  [theme.breakpoints.down("lg")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.4rem",
    margin: "0 10px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));
const StyledForeCast = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto",
  margin: 0,
  padding: 0,
  fontSize: "1.8rem", // default for larger screens

  [theme.breakpoints.down("lg")]: {
    fontSize: "1.6rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.3rem",
    margin: "0 10px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem", // default for larger screens

  [theme.breakpoints.down("lg")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: "5px",
  width: "1.35rem",
  height: "1.35rem",

  [theme.breakpoints.down("lg")]: {
    width: "1rem",
    height: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "1rem",
    height: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "0.8rem",
    height: "0.8rem",
  },
}));

const StyledButton = styled("button")(({ theme }) => ({
  fontSize: "1rem",
  padding: "0.25rem 1.5rem",
  borderRadius: "20px",
  border: "1px solid transparent",
  "&:hover": {
    backgroundColor: "gray",
  },

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.95rem",
    padding: "0.15rem 1rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8",
    padding: "0.1rem 0.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    padding: "2px 0.8rem",
  },
}));

const ForecastBtn = styled("button")(({ theme }) => ({
  fontSize: "1rem",
  padding: "0.4rem 1rem",
  borderRadius: "20px",
  border: "1px solid transparent",
  "&:hover": {
    backgroundColor: "gray",
  },

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
    padding: "0.35rem 0.6rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.6rem",
    padding: "0.30rem 0.3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
    padding: "0.2rem 0.3rem",
  },
}));

type FirestoreDocument = {
  city: string;
  state: string;
  temp: number;
  userval: string;
};

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
  const { user } = useAuthContext();

  const key = import.meta.env.VITE_NASA_API_KEY;
  const cityApi = `https://api.openweathermap.org/geo/1.0/direct?q=${userVal}&limit=5&appid=${key}`;
  const API = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation,rain,cloudcover,windspeed_10m,uv_index`;

  const fetchApi = useCallback(async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (res.ok) {
        const currentHourTemp =
          data.hourly.temperature_2m[new Date().getHours()];
        setTemp(currentHourTemp);
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
        return {
          temp: currentHourTemp,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, [API]);

  useEffect(() => {
    setLatitude(23.3322);
    setLongitude(86.3616);
    setCity("Purulia");
    setState("West Bengal");
  }, []);

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
        return {
          name: data[0].name,
          state: data[0].state,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
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
    if (user && typeof user.email === "string") {
      // const userCollectionName = user.email;
      const ref = collection(projectFirestore, user.email);
      const querySnapshot = await getDocs(ref);
      const existingValues: string[] = [];
      querySnapshot.forEach((doc) => {
        existingValues.push(doc.data().userval);
      });
      console.log(existingValues);
      return existingValues;
    }
  };

  const handleKeyPress = async (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      try {
        const cityData = await fetchCityApi(e); // This now directly returns the needed data.
        const weatherData = await fetchApi(); // This now directly returns the needed data.

        const existingValues = await fetchExistingValues();
        if (!existingValues) {
          console.error("Failed to fetch existing values");
          return;
        }

        if (user && typeof user.email === "string" && user.email !== "") {
          if (
            userVal &&
            cityData &&
            weatherData &&
            !existingValues.includes(userVal)
          ) {
            const ref = collection(projectFirestore, user.email);
            const dataToPush = {
              userval: userVal,
              city: cityData.name,
              state: cityData.state,
              temp: weatherData.temp,
            };
            console.log("Pushing data to Firestore:", dataToPush);
            await addDoc(ref, dataToPush);
            console.log("Data pushed successfully.");
          } else {
            console.log("Conditions not met to push data to Firestore.");
          }
        } else {
          console.error("User or user email is not valid");
        }
      } catch (error) {
        console.error("Error in handleKeyPress:", error);
      }
    }
  };

  useEffect(() => {
    setPrevData(null);
    // here we fetch the prev value
    if (user && typeof user.email === "string") {
      getDocs(collection(projectFirestore, user.email))
        .then((snapshot) => {
          const results: FirestoreDocument[] = [];
          snapshot.docs.forEach((doc) => {
            results.push(doc.data() as FirestoreDocument);
          });
          temp &&
            setPrevData((prev) => (prev ? [...prev, ...results] : results));
        })
        .catch((err) => {
          console.error("Failed to fetch data:", err);
        });
    }
  }, [temp, user]);

  return (
    <Layout>
      {/* sidebar */}
      <Sidebar />
      {/* mainbox */}
      <MainContainer>
        {/* navbar */}
        <Navbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* {user && user.displayName} */}
            <StyledAvatar alt="Remy Sharp" />
            <StyledTypography variant="h1">{formattedDate}</StyledTypography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledSkySight variant="h1">SkySight</StyledSkySight>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledInput
                id="search"
                type="text"
                placeholder="🔍Search city"
                onChange={(e) => setUserVal(e.target.value)}
                onKeyDown={handleKeyPress}
                value={userVal}
                autoComplete="off"
              />
            </Box>
            {/* <Box>lan</Box> */}
            {temp && (
              <Box
                sx={{
                  paddingRight: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StyledButton
                    sx={{
                      color: unit === "C" ? "black" : "#c2e9eb",
                      backgroundColor: unit === "C" ? "#c2e9eb" : "black",
                    }}
                    onClick={() => setUnit("C")}
                  >
                    C°
                  </StyledButton>
                  <StyledButton
                    sx={{
                      color: unit === "F" ? "black" : "#c2e9eb",
                      backgroundColor: unit === "F" ? "#c2e9eb" : "black",
                    }}
                    onClick={() => setUnit("F")}
                  >
                    F°
                  </StyledButton>
                </Box>
              </Box>
            )}
          </Box>
        </Navbar>

        {/* contents */}

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* row-1 */}
          <Box sx={{ display: "flex", minHeight: "35vh", height: "auto" }}>
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
          <Box sx={{ display: "flex", minHeight: "36vh" }}>
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
                margin: "8px",
                padding: "10px",
                borderRadius: "20px",
                backgroundColor: "#2e2e39",
                color: "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <StyledForeCast>ForeCast</StyledForeCast>
                <Box>
                  <Box
                    sx={{
                      borderRadius: "20px",
                      backgroundColor: "black",
                    }}
                  >
                    <ForecastBtn
                      onClick={handleThreeDaysClick}
                      sx={{
                        color: forecastDays === 3 ? "black" : "#c2e9eb",
                        backgroundColor:
                          forecastDays === 3 ? "#c2e9eb" : "black",
                      }}
                    >
                      3 days
                    </ForecastBtn>
                    <ForecastBtn
                      onClick={handleSixDaysClick}
                      sx={{
                        color: forecastDays === 6 ? "black" : "#c2e9eb",
                        backgroundColor:
                          forecastDays === 6 ? "#c2e9eb" : "black",
                      }}
                    >
                      6 days
                    </ForecastBtn>
                  </Box>
                </Box>
              </Box>

              {allTemp && (
                <FourthBox
                  forecastDays={forecastDays}
                  allTemp={allTemp}
                  unit={unit}
                />
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
                position: "relative",

                // Step 2: Add the ::after pseudo-element
                "::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "50%",
                  backgroundImage:
                    "linear-gradient(to right, transparent, #1e1f24)",
                },
              }}
            >
              <FifthBox prevData={prevData} />
            </Box>

            <Box
              sx={{
                flex: 1,
                margin: "10px",
                padding: "10px",
                borderRadius: "20px",
                backgroundColor: "transparent",
                color: "white",
                display: "flex", // set the display to flex
                alignItems: "center", // vertically align the content in the center
                justifyContent: "center", // horizontally align the content in the center
              }}
            >
              {/* <h1 style={{ margin: 0, padding: 0 }}>SkySight</h1> */}
            </Box>
          </Box>
        </Box>
      </MainContainer>
    </Layout>
  );
}

export default Home;
