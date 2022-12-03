import PlaceIcon from "@mui/icons-material/Place";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { getClassesList } from "../../src/services/classes.api";
import { Classes } from "../../src/utils/database/database.entities";
interface Gym {
  gymList: Classes[];
}

function ClassList({ gymList }: Gym) {
  const [gyms, setGyms] = useState(gymList);

  return (
    <>
      {gyms.map((gym: Classes) => {
        return (
          <Link key={gym.id} href={`/classes/${encodeURIComponent(gym.id)}`}>
            <Card sx={{ maxWidth: 345, marginBottom: "10px", display: "flex" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={gym.image}
                  alt={gym.exercise_type}
                />
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5" component="div">
                      {gym.name}
                    </Typography>
                    <Chip label={gym.credits_required} />
                  </div>
                  <Typography
                    sx={{ marginLeft: "3px" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {gym.exercise_type}
                  </Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PlaceIcon />
                    <Typography variant="body2" color="text.secondary">
                      {gym.distance}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        );
      })}

      <Toolbar />
    </>
  );
}

export async function getStaticProps() {
  const gymList = await getClassesList();

  return {
    props: { gymList },
  };
}

export default ClassList;

{
  /* <div
            style={{
              display: "flex",
              border: "1px solid black",
              borderRadius: "5px",
              margin: "5px",
            }}
            key={gym.id}
          >
            <img src={gym.image} width={100} heigth={100} />
            <div
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>title</h3>
                <span>description</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <span>icon</span>
                  <span> location</span>
                </div>
                <div>
                  <span>credits</span>
                </div>
              </div>
            </div>
          </div> */
}
