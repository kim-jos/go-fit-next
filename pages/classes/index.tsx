import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import CardListHorizontal from "../../components/CardHorizontal/CardListHorizontal";
import CardListVertical from "../../components/CardVertical/CardListVertical";
import { getClassesList } from "../../src/services/classes.api";
import { Classes } from "../../src/utils/database/database.entities";
import styles from "../../styles/Home.module.css";

interface Gym {
  gymList: Classes[];
}
function ClassList({ gymList }: Gym) {
  const [gyms, setGyms] = useState(gymList);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <div className={styles.container}>
      <TextField
        fullWidth
        sx={{
          borderRadius: 20,
          marginBottom: "10px",
        }}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchOutlinedIcon />
            </IconButton>
          ),
        }}
      />
      <CardListHorizontal gyms={gyms} />
      <CardListVertical />
    </div>
  );
}

export async function getStaticProps() {
  const gymList = await getClassesList();
  return {
    props: { gymList },
  };
}

export default ClassList;
