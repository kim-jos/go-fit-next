import { useState } from "react";
import { getClass } from "../../src/services/classes.api";

function ChatRoom({ gym }) {
  let [rating, setRating] = useState(0);
  return <div>chat room</div>;
}

export async function getServerSideProps({ params }) {
  const gym = await getClass(Number(params.id));
  return {
    props: { gym },
  };
}

export default ChatRoom;
