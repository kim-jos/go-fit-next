import React from 'react';
import CardComponent from "./CardComponent";
import styles from './card.module.css';

import { Classes } from "../../src/utils/database/database.entities";

const Card = ({gyms}) => {
    return (
        <div className={styles.swipeWrapper}>
            {
                gyms.map((gym: Classes, idx) => {
                    return(
                        <CardComponent contents={gym} link={`/classes/${encodeURIComponent(gym.id)}`} key={idx}/>
                    )
                })
            }
        </div>
    )
}

export default Card;