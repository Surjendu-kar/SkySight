/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, styled } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapsOverlay = styled(Box)(({ theme }) => ({
  flex: 1,
  margin: "10px",
  padding: "10px",
  backgroundColor: "transparent",
  color: "white",

  [theme.breakpoints.down("md")]: {
    margin: "2px",
  },
}));

type FirstBoxProps = {
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
};

const SecondBox = ({ city, state, latitude, longitude }: FirstBoxProps) => {
  return (
    <MapsOverlay>
      {latitude && longitude && (
        <MapContainer
          key={`${latitude}-${longitude}`}
          // @ts-ignore
          center={[latitude, longitude]}
          zoom={13}
          style={{
            width: "100%",
            height: '13.5rem',
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
    </MapsOverlay>
  );
}

export default SecondBox;
