import { Button, Rating, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { getClass, getClassesList } from "../../src/services/classes.api";
import { Classes } from "../../src/utils/database/database.entities";

function ClassDetails({ gym }) {
  let [rating, setRating] = useState(0);
  return (
    <>
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
