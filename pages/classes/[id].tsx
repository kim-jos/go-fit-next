import { Button, Rating, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { getClass } from "../../src/services/classes.api";

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

export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const gym = await getClass(id);
  return {
    props: { gym },
  };
}

export default ClassDetails;
