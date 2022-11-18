import { Button } from "@mui/material";
import Link from "next/link";
import { getClass } from "../../src/services/classes.api";

function ClassDetails({ gym }: any) {
  console.log(gym);
  return (
    <>
      <div>{gym.name}</div>
      <Button>
        <Link href={`/classes/reserve/${encodeURIComponent(gym.id)}`}>
          예약하기
        </Link>
      </Button>
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
