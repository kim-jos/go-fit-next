import { Button } from "@mui/material";
import Link from "next/link";
import ImgSlider from '../../components/ImgSlider';

import { getClass } from "../../src/services/classes.api";
import {ClassDetailWrapper, InfoWrapper, ClassButton} from "../../styles/component/card";

function ClassDetails({ gym }: any) {
  console.log(gym);
    return (
    <>
      <ImgSlider/>
      <ClassDetailWrapper>
        <span className='title'>{gym.name}</span>
        <span className='description'>{gym.description}</span>
      </ClassDetailWrapper>
      <InfoWrapper>
        <span className='title'>수업 유형</span>
        <span className='content'>{gym.exercise_type}</span>
        <span className='title'>소요시간</span>
        <span className='content'>{gym.duration}</span>
        <span className='title'>수업 준비물</span>
        <span className='content'>{gym.requirements}</span>
        <span className='title'>소요 크레딧</span>
        <span className='content'>{gym.credits_required}</span>
      </InfoWrapper>
      <ClassButton variant="contained" style={{marginBottom: 70}}>
        <Link href={`/classes/reserve/${encodeURIComponent(gym.id)}`} className='Link'>
          예약하기
        </Link>
      </ClassButton>
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
