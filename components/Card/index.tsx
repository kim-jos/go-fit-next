import React from 'react';
import CardComponent from "./CardComponent";
import {SwipeWrapper} from '../../styles/component/card';
import { Classes } from "../../src/utils/database/database.entities";

const Card = ({gyms, contents}) => {
    return (
        <SwipeWrapper>
            {
                gyms.map((gym: Classes, idx) => {
                    return(
                        <CardComponent data={gym} contents={contents} link={`/classes/${encodeURIComponent(gym.id)}`} key={idx}/>
                    )
                })
            }
         </SwipeWrapper>
    )
}

export default Card;