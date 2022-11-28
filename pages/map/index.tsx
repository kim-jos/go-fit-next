import { Map, MapMarker } from "react-kakao-maps-sdk";

function Home() {
  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "600px" }}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Location</div>
        </MapMarker>
      </Map>
    </>
  );
}

export default Home;
