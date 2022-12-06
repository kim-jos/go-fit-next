import { Box, Button, Card, Rating, Typography } from "@mui/material";
import Link from "next/link";
import Carousel from "nuka-carousel";
import { useState } from "react";
import { getClass } from "../../src/services/classes.api";
import { getReservations } from "../../src/services/reservations.api";
import {
  Classes,
  ReservationTransactions,
} from "../../src/utils/database/database.entities";

interface Gym {
  gym: Classes;
  allReservations: ReservationTransactions[];
}

function ClassDetails({ gym, allReservations }: Gym) {
  let [rating, setRating] = useState(0);

  const showReservations = () => {
    const reservations = allReservations?.map(
      (reservation: ReservationTransactions) => (
        <Card key={reservation.id} sx={{ margin: "10px" }}>
          <div>userId: {reservation.user_id}</div>
          <>
            reservation date:{" "}
            {new Date(reservation.reservation_date).toLocaleDateString("ko-KO")}
          </>
          <div>classTime: {reservation.class_time}</div>
        </Card>
      )
    );
    return reservations;
  };

  return (
    <>
      <Box sx={{ height: "200px" }}>
        <Carousel
          renderTopCenterControls={({ currentSlide }) => (
            <div>Slide: {currentSlide}</div>
          )}
          adaptiveHeight={true}
          wrapAround={true}
        >
          <img
            alt="Picture of the author"
            src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            width={500}
            height={300}
          />
          <img
            alt="Picture of the author"
            src="https://thumbs.dreamstime.com/b/cuban-rock-iguana-cyclura-nubila-also-known-as-ground-81402959.jpg"
            width={500}
            height={300}
          />
        </Carousel>
      </Box>

      <div>{gym.name}</div>
      <Button variant="contained">
        <Link href={`/classes/reserve/${encodeURIComponent(gym.id)}`}>
          예약하기
        </Link>
      </Button>

      <Typography component="legend">리뷰 남겨주세요!</Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        precision={0.5}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
    </>
  );
}

// export async function getStaticPaths() {
//   const gyms = await getClassesList();
//   const paths = gyms.map((gym: Classes) => ({
//     params: { id: `${gym.id}` },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }) {
  const gym = await getClass(Number(params.id));
  const allReservations = await getReservations();
  return {
    props: { gym, allReservations },
  };
}

export default ClassDetails;
