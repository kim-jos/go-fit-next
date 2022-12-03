import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

interface Coordinates {
  x;
  y;
}

function Home() {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [markers, setMarkers] = useState([]);
  const [coords, setCoords] = useState<Coordinates>();

  useEffect(() => {
    if (!map) return;
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(
      "서울시 관악구 관악로 15길 47-14",
      // "제주특별자치도 제주시 첨단로 242",
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const x = Number(result[0].address.x);
          const y = Number(result[0].address.y);
          const coords = { x, y };
          setCoords(coords);
        }
      }
    );
  }, [map]);

  return (
    <>
      <Map
        center={{ lat: 37.481277765, lng: 126.95275023 }}
        style={{ width: "100%", height: "600px" }}
        level={3}
        onCreate={setMap}
      >
        {/* {coords ? (
          <MapMarker
            position={{
              lat: coords.x,
              lng: coords.y,
            }}
          >
            <div style={{ color: "#000" }}>집</div>
          </MapMarker>
        ) : null} */}
      </Map>
    </>
  );
}

export default Home;
