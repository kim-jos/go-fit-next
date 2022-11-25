import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { TextField, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Card from '../../components/Card/index';
import ListCard from '../../components/ListCard/index';

import { useState } from "react";
import { getClassesList } from "../../src/services/classes.api";
import { Classes } from "../../src/utils/database/database.entities";
import styles from "../../styles/Home.module.css";


function ClassList({ gymList }) {
  const [gyms, setGyms] = useState(gymList);

  const contents = {
    themeIcon: null,
    background: null,
    title: '가나다',
    address: '대야동',
    credit: 3
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  const showGymList = () => {
    return gyms.map((gym: Classes) => {
      return (
        <Button key={gym.id} variant="contained">
          <Link href={`/classes/${encodeURIComponent(gym.id)}`}>
            {gym.name}
          </Link>
        </Button>
      );
    });
  };

  return (
    <div className={styles.container}>
    <TextField
      fullWidth
      sx={{
        borderRadius: 20,
        marginBottom: '10px'
      }}

      InputProps={{
      endAdornment: (
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
      ),
    }}/>
    <Card gyms={gyms}/>
    <ListCard/>
    </div>
  );
}

export async function getServerSideProps() {
  const gymList = await getClassesList();
  return {
    props: { gymList },
  };
}

export default ClassList;
