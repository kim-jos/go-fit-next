import { Classes } from "../../src/utils/database/database.entities";
import styles from "./card.module.css";
import CardHorizontal from "./CardHorizontal";

const CardListHorizontal = ({ gyms }) => {
  return (
    <div className={styles.swipeWrapper}>
      {gyms.length
        ? gyms.map((gym: Classes, idx) => {
            return (
              <CardHorizontal
                contents={gym}
                link={`/classes/${encodeURIComponent(gym.id)}`}
                key={idx}
              />
            );
          })
        : null}
    </div>
  );
};

export default CardListHorizontal;
