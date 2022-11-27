export default function Map() {
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=당신의AppKey&amp;autoload=false`;
        document.head.appendChild(script);

        script.addEventListener("load", () => {
            window.kakao.maps.load(() =>  {
                const mapContainer = document.getElementById("map");
                const mapOption = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 8, // 지도의 확대 레벨
                };
                new window.kakao.maps.Map(mapContainer, mapOption);
            }
    )
    })
        ;
    }, [])

    return (
        <>
        <div id = "map">
        </div>
        </>
    )
}
