import Link from "next/link";
import ImgSlider from "../../components/Carousel";
import { getClass, getClassImages } from "../../src/services/classes.api";
import {
  Classes,
  ClassImages,
} from "../../src/utils/database/database.entities";
import {
  ClassButton,
  ClassDetailWrapper,
  InfoWrapper,
} from "../../styles/card.styles";

interface Gym {
  gym: Classes;
  gymImages: ClassImages;
  // allReservations: ReservationTransactions[];
}

function ClassDetails({ gym, gymImages }: Gym) {
  return (
    <>
      <ImgSlider images={gymImages} />
      <ClassDetailWrapper>
        <span className="title">{gym.name}</span>
        <span className="description">{gym.description}</span>
      </ClassDetailWrapper>
      <InfoWrapper>
        <span className="title">수업 유형</span>
        <span className="content">{gym.exercise_type}</span>
        <span className="title">소요시간</span>
        <span className="content">{gym.duration}</span>
        <span className="title">수업 준비물</span>
        <span className="content">{gym.requirements}</span>
        <span className="title">소요 크레딧</span>
        <span className="content">{gym.credits_required}</span>
      </InfoWrapper>
      <ClassButton variant="contained" style={{ marginBottom: 70 }}>
        <Link
          href={`/classes/reserve/${encodeURIComponent(gym.id)}`}
          className="Link"
        >
          예약하기
        </Link>
      </ClassButton>
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
  const classId = Number(params.id);
  const gym = await getClass(classId);
  const gymImages = await getClassImages(classId);
  // const allReservations = await getReservations();
  return {
    props: { gym, gymImages },
  };
}

export default ClassDetails;
