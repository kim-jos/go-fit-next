import { Box, Button, Rating, Typography } from "@mui/material";
import Link from "next/link";
import Carousel from "nuka-carousel";
import { useState } from "react";
import { getClass, getClassesList } from "../../src/services/classes.api";
import { Classes } from "../../src/utils/database/database.entities";

interface Gym {
  gym: Classes;
}

function ClassDetails({ gym }: Gym) {
  let [rating, setRating] = useState(0);
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

export async function getStaticPaths() {
  const gyms = await getClassesList();
  const paths = gyms.map((gym: Classes) => ({
    params: { id: `${gym.id}` },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const gym = await getClass(Number(params.id));
  return {
    props: { gym },
  };
}

export default ClassDetails;
