import { Box, Card, Typography, styled } from "@mui/material";
import { v4 as uuid } from "uuid";

const TemperatureBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  minWidth: "100%",
  borderRadius: "20px",
}));

const PrevDataContainer = styled(Card)(({ theme }) => ({
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
  [theme.breakpoints.down("lg")]: {
    minWidth: "5rem",
    height: "2rem",
    padding: "20px",
    margin: "5px",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "4rem",
    height: "2rem",
    padding: "20px",
    margin: "5px",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "3rem",
    height: "1rem",
    padding: "20px",
    margin: "5px",
  },
}));

const City = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
  },
}));
const State = styled(Typography)(({ theme }) => ({
  fontSize: "0.65rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.60rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.4rem",
  },
}));
const Temp = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
  },
}));

type FirestoreDocument = {
  city: string;
  state: string;
  temp: number;
  userval: string;
};

type FifthBoxProps = {
  prevData: FirestoreDocument[] | null;
};

function FifthBox({ prevData }: FifthBoxProps) {
  return (
    <TemperatureBox>
      {prevData?.map((each) => (
        <PrevDataContainer key={uuid()} sx={{ color: "white" }}>
          <City>{each.city}</City>
          <State>{each.state}</State>
          <Box display={"flex"}>
            <Temp>{each.temp}°</Temp>
          </Box>
        </PrevDataContainer>
      ))}
    </TemperatureBox>
  );
}

export default FifthBox;
